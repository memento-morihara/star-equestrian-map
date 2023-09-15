<script>
    import { selectedMarker } from "$lib/stores.js";
    import RespawningContent from "./RespawningContent.svelte";
    import { fade } from "svelte/transition";
    // Chooses the correct content component according to the marker type

    // Store that holds the marker object of the Leaflet marker whose popup is currently open
</script>

<div out:fade>
    <div class="title">
        <strong>{$selectedMarker.options.name}</strong>
    </div>
    <svelte:component this={RespawningContent} />
</div>
