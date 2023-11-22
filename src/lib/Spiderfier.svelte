<script>
    import {getContext, onMount} from "svelte";
    import {browser} from "$app/environment";
    import {allMarkers} from "$lib/stores.js";
    import OverlappingMarkerSpiderfier from "$lib/oms.js";

    const map = getContext("map")();
    let oms;

    onMount(() => {
        if (browser) {
            oms = new OverlappingMarkerSpiderfier(map, {
                keepSpiderfied: true,
                legColors: {
                    usual: "white",
                    highlighted: "red",
                }
            });

            oms.addListener("spiderfy", () => {
                map.closePopup()
            });
        }
    });


    $: oms && $allMarkers.forEach(marker => oms.addMarker(marker));
</script>

<slot/>
