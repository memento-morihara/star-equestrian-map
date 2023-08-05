import {chests, collectibles, food, other, resources} from "./markers.js";
import {howManyDays} from "./dateutils.js";
import './style.css'

const staticMarkers = ["Cave Entrance"];
const oneTimeMarkers = ["Toy Unicorn", "Sheriff Badge", "Horseshoe", "Message in a Bottle"]
const icons = [ food, resources, chests, collectibles, other ].flat();

console.log(howManyDays(1690766044205))

// Umbrella class to abstract away the marker types
export class Marker {
    constructor(itemId, itemName, lat, lng, description) {
        if (staticMarkers.includes(itemName)) {
            Object.assign(this, new StaticMarker(itemId, itemName, lat, lng, description));
            this._markerType = "static";
            this.itemId = itemId;
            this._mapMarker = this.mapMarker;
        } else if (oneTimeMarkers.includes(itemName)) {
            Object.assign(this, new OneTimeMarker(itemId, itemName, lat, lng, description));
            this._markerType = "oneTime";
            this.itemId = itemId;
            this._mapMarker = this.mapMarker;
            this.collected = !!localStorage.getItem(`${this.itemId}.collected`);
            if (this.collected) {
                this.mapMarker.setOpacity(0.5)
            }
        } else {
            const marker = new RespawningMarker(itemId, itemName, lat, lng, description);
            Object.assign(this, marker);
            this._markerType = "respawning";
            this._mapMarker = this.mapMarker;
            this.itemId = itemId;
            this.lastCollectedDate = localStorage.getItem(`${this.itemId}.lastCollected`);
            this.lastNegativeSpawnDate = localStorage.getItem(`${this.itemId}.lastNegativeSpawn`);
        }
    }


    get markerType() {
        return this._markerType;
    }

    get mapMarker() {
        return this._mapMarker;
    }

    collect() {
        if (this.markerType === "oneTime") {
            localStorage.setItem(`${this.itemId}.collected`, true)
            this.collected = true;
        } else if (this.markerType === "respawning") {
            this.lastCollectedDate = Date.now();
            localStorage.setItem(this.lastCollectedKey, Date.now().toString());
        }
        this.mapMarker.setOpacity(0.5);
    }

    noSpawn() {
        if (this.markerType === "respawning") {
            this.lastNegativeSpawnDate.set(Date.now());
            localStorage.setItem(this.lastNegativeSpawnKey, Date.now().toString());
        }
    }
}


class BaseMarker {
    constructor(itemId, itemName, lat, lng, description) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.lat = lat;
        this.lng = lng;
        this.description = description;

        this._mapMarker = this.initMapMarker();
    }

    get mapMarker() {
        return this._mapMarker;
    }

    initMapMarker() {
        return L.marker([this.lat, this.lng], {
            name: this.itemName,
            id: this.itemId,
            riseOnHover: true,
            icon: icons.find(i => i.name === this.itemName).icon ?? L.icon({iconUrl: './se-marker.svg'})
        }).bindPopup(`
            <h3>${this.itemName}</h3>
            <p>${this.description ?? ""}</p>
        `)
    }
}

class RespawningMarker extends BaseMarker {
    constructor(itemId, itemName, lat, lng, description) {
        super(itemId, itemName, lat, lng, description);

        this.lastCollectedKey = `${this.itemId}.lastCollected`;
        this.lastNegativeSpawnKey = `${this.itemId}.lastNegativeSpawn`;
        this._mapMarker = this.initMapMarker();
    }

    get lastCollectedDate() {
        return localStorage.getItem(this.lastCollectedKey)
    }

    set lastCollectedDate(date) {
     this._lastCollectedDate = date;
        localStorage.setItem(this.lastCollectedKey, date);
    }

    get lastNegativeSpawnDate() {
        return localStorage.getItem(this.lastNegativeSpawnKey);
    }

    set lastNegativeSpawnDate(date) {
        localStorage.setItem(this.lastNegativeSpawnKey, date);
    }

    initMapMarker() {
       const marker = L.marker([this.lat, this.lng], {
            name: this.itemName,
            id: this.itemId,
            riseOnHover: true,
            icon: icons.find(i => i.name === this.itemName).icon ?? L.icon({iconUrl: './se-marker.svg'})
        }).bindPopup(`
<div class="leaflet-popup-content">
            <h3>${this.itemName}</h3>
<!--            <small id="last-collected">Last collected: ${ this.lastCollectedDate ? `<sl-relative-time date="${new Date(Number(this.lastCollectedDate))}"></sl-relative-time>` : `<span id="na">N/A</span>`}</small>-->
            <p>${this.description}</p>
<!--            <div class="spawn-buttons">-->
<!--            <sl-button id="collect" variant="primary">Collect</sl-button><sl-icon-button id="no-respawn" name="calendar-x" label="Not respawned" ></sl-icon-button></div>-->
</div>`)
    const popup = document.querySelector("#popup");
       popup && document.getElementById("collect").addEventListener("sl-click", () => {
           let lastCollectedText;
           if (this.lastCollectedDate) {
               this.lastCollectedDate = Date.now();
               lastCollectedText =
                   document.querySelector("sl-relative-time");
               lastCollectedText.setAttribute("date", this.lastCollectedDate);
           } else {
               this.lastCollectedDate = Date.now();
            lastCollectedText = document.getElementById("last-collected");
            lastCollectedText.innerHTML = `<sl-relative-time date="${new Date(Number(this.lastCollectedDate))}"></sl-relative-time>`
           }

       })
        return marker;
    }
}

class OneTimeMarker extends BaseMarker {
    constructor(itemId, itemName, lat, lng, description) {
        super(itemId, itemName, lat, lng, description);

        this._collected = false;
        this._mapMarker = this.initMapMarker();
    }

    get collected() {
        return this._collected;
    }

    set collected(collected) {
        this._collected = collected;
        localStorage.setItem(this.Id, this._collected);
    }

    get Id() {
        return this.itemId;
    }
    initMapMarker() {
        const marker =  L.marker([this.lat, this.lng], {
            name: this.itemName,
            id: this.itemId,
            riseOnHover: true,
            icon: icons.find(i => i.name === this.itemName).icon ?? L.icon({iconUrl: './se-marker.svg'})
        }).bindPopup(`
            <h3>${this.itemName}</h3>
            <p>${this.description ?? ""}</p>
            <div>
<!--            <button id="collect" class="button is-primary is-rounded is-fullwidth">Collect</button>-->
</div>
        `)

        if (this.collected) {
            this.mapMarker.setOpacity(0.5)
        }

        return marker;
    }
}

class StaticMarker extends BaseMarker {
    constructor(itemId, itemName, lat, lng, description) {
        super(itemId, itemName, lat, lng, description);
        this._mapMarker = super.initMapMarker();
    }
}


