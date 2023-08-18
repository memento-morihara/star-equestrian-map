<script>
    import {getContext, onMount, setContext} from "svelte";
    import {shownMarkers} from "./stores.js";

    const map = getContext("map")();
    let oms;

    onMount(() => {
        oms = new OverlappingMarkerSpiderfier(map, {
            keepSpiderfied: true,
            legColors: {usual: "white", highlighted: "red"}
        });
        oms.addListener("spiderfy", () => map.closePopup());
    });

    $: oms && $shownMarkers.forEach(marker => oms.addMarker(marker));
    setContext('oms', () => oms);
</script>

<slot/>
