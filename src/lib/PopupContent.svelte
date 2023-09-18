<script>
    import { selectedMarker } from "$lib/stores.js";
    import OneTimeContent from "./OneTimeContent.svelte";
    import RespawningContent from "./RespawningContent.svelte";
    import { fade } from "svelte/transition";

    const popupContent = () => {
        switch ($selectedMarker.options.markerType) {
            case "respawning":
                return RespawningContent;
            case "one-time":
                return OneTimeContent;
        }
    };

    const marker = $selectedMarker;
</script>

<div class="popup-content">
    <div
        class="title"
        class:centered={!marker.options.description &&
            marker.options.markerType === "static"}
    >
        <strong>{$selectedMarker.options.name}</strong>
    </div>
    {#if $selectedMarker.options.markerType !== "respawning" && $selectedMarker.options.description}
        <p>{$selectedMarker.options.description}</p>
    {/if}
    {#if marker.options.markerType !== "static"}
        <svelte:component this={popupContent()} />
    {/if}
</div>

<style>
    .popup-content {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-2x-small);
    }

    .title {
        width: 100%;
        font-size: var(--sl-font-size-large);
    }

    .centered {
        text-align: center;
    }
</style>
