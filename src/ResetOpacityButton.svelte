<script>
    import {allMarkers} from "./stores.js";
    import {createEventDispatcher, onMount} from "svelte";

    const dispatch = createEventDispatcher();

    function fixOpacity() {
        const respawning = $allMarkers.filter(marker => marker.options.markerType === "respawning");
        respawning.forEach(marker => {
            const lastCollected = new Date(Number(localStorage.getItem(`${marker.options.id}.lastCollected`)));
            const lastNegativeRespawn = new Date(Number(localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`)));
            let broken;

            broken = !(!lastCollected || lastCollected.getDate() === new Date().getDate()) && !(!lastNegativeRespawn || lastNegativeRespawn.getDate() === new Date().getDate());
            broken ? marker.setOpacity(1) && dispatch("opacityReset", marker) : marker.setOpacity(0.5);
        })
    }

    onMount(() => {
        document.querySelector("sl-button").click();
    })
</script>

<sl-button on:click={fixOpacity}>Reset opacity</sl-button>
