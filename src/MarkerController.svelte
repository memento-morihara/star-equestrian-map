<script>
import Popup from "./Popup.svelte";
import Marker from "./Marker.svelte";
import {allMarkers, shownMarkers, selectedMarkerId} from "./stores.js";
import {getContext, onDestroy, onMount} from "svelte";
import {locations} from "../locations.js";

const map = getContext("map")();

$: {
    $allMarkers.forEach(marker => marker.remove());
    $shownMarkers.forEach(marker => marker.addTo(map))
}

onMount(() => {
   $shownMarkers.forEach(marker => marker.addTo(map))
})

$: collected = (marker) => localStorage.getItem(`${marker.id}.lastCollected`) || localStorage.getItem(`${marker.id}.collected`)

</script>

{#each locations as marker}
    <Marker {marker} latLng={[marker.lat, marker.lng]}>
        <Popup collected={collected(marker)}>
                <strong slot="title">{marker.name}</strong>
            <p class:no-desc={!marker.description} slot="description">{marker.description}</p>
        </Popup>
    </Marker>
{/each}

<style>
    strong {
        font-size: 1.3rem;
        vertical-align: middle;
    }

    p {
        font-size: 1rem;
        margin: 0.5em 0;
    }

    .no-desc {
        margin: 0 0 0.34em;
    }
</style>