<script>
    import Popup from "./Popup.svelte";
    import Marker from "./Marker.svelte";
    import {
        allMarkers,
        formatName,
        shownMarkers,
        shownStats,
    } from "./stores.js";
    import { getContext } from "svelte";
    import { locations } from "../locations.js";

    const map = getContext("map")();

    $: {
        map && $allMarkers.forEach((marker) => marker.remove());
        // Add all non-food markers to map, then conditionally add food markers
        $shownMarkers.forEach((marker) => {
            if (marker.options.category !== "food") {
                marker.addTo(map);
            } else if (
                map.hasLayer(marker) !==
                $shownStats[formatName(marker.options.stat)]
            ) {
                if ($shownStats[formatName(marker.options.stat)]) {
                    marker.addTo(map);
                }
            }
        });
    }
    $: collected = (marker) =>
        new Date(
            Number(localStorage.getItem(`${marker.id}.lastCollected`))
        ).getUTCDate() === new Date().getUTCDate() ||
        localStorage.getItem(`${marker.id}.collected`);
    $: notRespawned = (marker) =>
        new Date(
            Number(localStorage.getItem(`${marker.id}.lastNegativeRespawn`))
        ).getUTCDate() === new Date().getUTCDate();
</script>

{#each locations as marker}
    <Marker {marker} latLng={[marker.lat, marker.lng]}>
        <Popup
            collected={collected(marker)}
            notRespawned={notRespawned(marker)}
        />
    </Marker>
{/each}
