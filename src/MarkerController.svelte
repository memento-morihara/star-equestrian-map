<script>
    import Popup from "./Popup.svelte";
    import Marker from "./Marker.svelte";
    import {allMarkers, formatName, shownMarkers, shownStats, stat} from "./stores.js";
    import {getContext} from "svelte";
    import {locations} from "../locations.js";

    const map = getContext("map")();

    $: {
        map && $allMarkers.forEach(marker => marker.remove());
        // Add all non-food markers to map, then conditionally add food markers
        $shownMarkers.forEach(marker => {
                if (marker.options.category !== "food") {
                    marker.addTo(map);
                } else if (map.hasLayer(marker) !== $shownStats[formatName(marker.options.stat)]) {
                    if ($shownStats[formatName(marker.options.stat)]) {
                        marker.addTo(map);
                    }
                }
            }
        )
    }
    $: collected = marker => new Date(Number(localStorage.getItem(`${marker.id}.lastCollected`))).getUTCDate() === new Date().getUTCDate() || localStorage.getItem(`${marker.id}.collected`);
    $: notRespawned = marker => new Date(Number(localStorage.getItem(`${marker.id}.lastNegativeRespawn`))).getUTCDate() === new Date().getUTCDate();
</script>

{#each locations as marker}
    <Marker {marker} latLng={[marker.lat, marker.lng]}>
        <Popup collected={collected(marker)} notRespawned={notRespawned(marker)}>
            <div class="title" slot="title">
                <strong>{marker.name}</strong>
                {#if stat(marker.name)}<img src={`./icons/${stat(marker.name)}.svg`} height="18"
                                            title={stat(marker.name)} alt={`${stat(marker.name)}`}/>{/if}
            </div>
            <p class:no-desc={!marker.description} slot="description">{marker.description}</p>
        </Popup>
    </Marker>
{/each}

<style>
    strong {
        font-size: 1.3rem;
        vertical-align: middle;
        margin-right: 0.5rem;
    }

    p {
        font-size: 1rem;
        margin: 0.5em 0;
    }

    .no-desc {
        margin: 0 0 0.34em;
    }

    .title {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }
</style>