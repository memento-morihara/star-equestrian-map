import {chests, collectibles, food, other, resources} from "./markers.js";

const staticMarkers = ["Cave Entrance"];
const oneTimeMarkers = ["Toy Unicorn", "Sheriff Badge", "Horseshoe", "Message in a Bottle"]
const icons = [ food, resources, chests, collectibles, other ].flat();


// Umbrella class to abstract away the marker types
export class Marker {
    constructor(itemId, itemName, lat, lng, description) {
        if (staticMarkers.includes(itemName)) {
            Object.assign(this, new StaticMarker(itemId, itemName, lat, lng, description));
            this._markerType = "static";
            this._mapMarker = this.mapMarker;
        } else if (oneTimeMarkers.includes(itemName)) {
            Object.assign(this, new OneTimeMarker(itemId, itemName, lat, lng, description));
            this._markerType = "oneTime";
            this._mapMarker = this.mapMarker;
        } else {
            Object.assign(this, new RespawningMarker(itemId, itemName, lat, lng, description));
            this._markerType = "respawning";
            this._mapMarker = this.mapMarker;
        }
    }

    get markerType() {
        return this._markerType;
    }

    get mapMarker() {
        return this._mapMarker;
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
            <h2 class="marker-title">${this.itemName}</h2>
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
        return this._lastCollectedDate;
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
       return L.marker([this.lat, this.lng], {
            name: this.itemName,
            id: this.itemId,
            riseOnHover: true,
            icon: icons.find(i => i.name === this.itemName).icon ?? L.icon({iconUrl: './se-marker.svg'})
        }).bindPopup(`
            <h2 class="marker-title">${this.itemName}</h2>
            <p>${this.description ?? ""}</p>
            <div data-collect="respawn">
            <small>Last collected: ${(this.lastCollectedDate && new Date(this.lastCollectedDate).toLocaleDateString() )?? "N/A"}</small>
</div>
        `)
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
        return L.marker([this.lat, this.lng], {
            name: this.itemName,
            id: this.itemId,
            riseOnHover: true,
            icon: icons.find(i => i.name === this.itemName).icon ?? L.icon({iconUrl: './se-marker.svg'})
        }).bindPopup(`
            <h2 class="marker-title">${this.itemName}</h2>
            <p>${this.description ?? ""}</p>
            <div>
</div>
        `)
    }
}

class StaticMarker extends BaseMarker {
    constructor(itemId, itemName, lat, lng, description) {
        super(itemId, itemName, lat, lng, description);
        this._mapMarker = super.initMapMarker();
    }
}


