<!-- Controls marker behavior (show/hide, collect, init, etc.) -->
<!-- The marker component renders the marker and a slot for the popup -->
<script>
import Popup from "./Popup.svelte";
import Marker from "./Marker.svelte";
import {allMarkers, shownMarkers, selectedMarkerId} from "./stores.js";
import {getContext, onDestroy, onMount} from "svelte";
import {chests, collectibles, food, other, resources} from "../markers.js";
import {locations} from "../locations.js";
import PopupContent from "./PopupContent.svelte";

const {getMap, getOms} = getContext("map");
const map = getMap();
const oms = getOms();



const icons = [food, chests, resources, collectibles, other].flat();

function initMarkers() {
    let arr = [];
    for (let location of locations) {
    let markerIcon = icons.find(i => i.name === location.name);
        let marker = L.marker( [location.lat, location.lng],
             {
                id: location.id,
                name: location.name,
                markerType: markerIcon.markerType,
                icon: markerIcon.icon,
                description: location.description,
            }
        );
        marker.on("click", () => $selectedMarkerId = marker);
        if (marker.options.markerType === "respawning") {
            marker.options.respawnTime = markerIcon.respawnTime;
        }
        arr.push(marker);
    }
    return arr;
}

function createMarker(node, marker) {
    marker = L.marker({...marker}).addTo(map)
    popup = L.popup({content: "I'm a popup"});
    marker.bindPopup(popup)
}

$: {
    $allMarkers.forEach(marker => marker.remove());
    $shownMarkers.forEach(marker => marker.addTo(map));
}

onMount(() => {
   $allMarkers = initMarkers();
})

onDestroy(() => {
    $allMarkers.forEach(marker => marker.remove());
})

let popupEl;

</script>

{#each $shownMarkers as marker (marker.options.id)}
    <Marker {marker}>
        <Popup />
    </Marker>
{/each}
