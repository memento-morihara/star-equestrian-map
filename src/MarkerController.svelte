<script>
    import Popup from "./Popup.svelte";
    import Marker from "./Marker.svelte";
    import {allMarkers, shownMarkers, stats} from "./stores.js";
    import {getContext, onMount} from "svelte";
    import {locations} from "../locations.js";

    const map = getContext("map")();

    $: {
        $allMarkers.forEach(marker => marker.remove());
        $shownMarkers.forEach(marker => marker.addTo(map))
    }

    onMount(() => {
        $shownMarkers.forEach(marker => {
            marker.addTo(map)
            console.log(stat(marker.options.name))
        });
    });

    const stat = markerName => {
        let arr = stats.find(s => s.food.includes(markerName));
        return arr?.name;
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
    }
</style>