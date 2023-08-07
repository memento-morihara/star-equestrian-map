<script>
    import {getContext, onMount, setContext} from "svelte";

    const {getMap, getOms} = getContext("map");
    const map = getMap();
    const oms = getOms();

    export let marker;

    setContext(L.Marker, {
        getMarker: () => marker,
        collectMarker: () => collect(marker)
    });

    marker.addTo(map);
    oms.addMarker(marker)

    if (marker.options.markerType === "respawning") {
        marker.options.lastCollected = localStorage.getItem(`${marker.options.id}.lastCollected`);
        new Date().getUTCDate() - new Date(marker.options.lastCollected).getUTCDate() !== 0 ? marker.setOpacity(1) : marker.setOpacity(0.3)
    } else if (marker.options.markerType === "one-time") {
        marker.options.collected = localStorage.getItem(`${marker.options.id}.collected`);
        marker.options.collected ? marker.setOpacity(0.3) : marker.setOpacity(1);
    }

    function collect(marker) {
        marker.options.markerType === "respawning"
            ? localStorage.setItem(`${marker.options.id}.lastCollected`, Date.now().toString())
            : localStorage.setItem(`${marker.options.id}.collected`, "true");
        marker.setOpacity(0.3);
        marker.options.lastCollected = localStorage.getItem(`${marker.options.id}.lastCollected`);
    }
</script>

{#if marker}
<slot />
{/if}
