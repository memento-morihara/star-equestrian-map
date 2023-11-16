<script>
    import {getContext, onMount, setContext} from "svelte";
    import {browser} from "$app/environment";
    import {allMarkers} from "$lib/stores.js";

    const map = getContext("map")();
    let oms;

    setContext("oms", () => oms);

    if (browser && window) {
        onMount(async () => {
            await import("overlapping-marker-spiderfier-leaflet");
            oms = new OverlappingMarkerSpiderfier(map, {
                keepSpiderfied: true,
                legColors: {
                    usual: "white",
                    highlighted: "red",
                }
            });

            $allMarkers.forEach(marker => oms.addMarker(marker));

            oms.addListener("spiderfy", () => {
                map.closePopup()
            });
        });
    }

</script>

<slot />
