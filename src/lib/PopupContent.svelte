<script>
    import { selectedMarker } from "$lib/stores.js";
    import OneTimeContent from "./OneTimeContent.svelte";
    import RespawningContent from "./RespawningContent.svelte";
    import { fade } from "svelte/transition";
    import { page } from "$app/stores";

    const popupContent = () => {
        switch ($selectedMarker.options.markerType) {
            case "respawning":
                return RespawningContent;
            case "one-time":
                return OneTimeContent;
        }
    };

    const marker = $selectedMarker;
    const url = new URL($page.url);
    const search = url.searchParams;
    search.set("id", $selectedMarker.options.id);
</script>

{#if $selectedMarker}
    <div class="popup-content" id={$selectedMarker.options.id}>
        <div class="header">
            <div
                class="title"
                class:centered={!marker.options.description &&
                    marker.options.markerType === "static"}
            >
                <strong>{$selectedMarker.options.name} </strong>
            </div>
            <sl-copy-button
                value={url.toString()}
                copy-label="Copy permalink"
                success-label="Copied!"
            />
        </div>
        <div class="content">
            {#if $selectedMarker.options.markerType !== "respawning" && $selectedMarker.options.description}
                <p>{$selectedMarker.options.description}</p>
            {/if}
            {#if marker.options.markerType !== "static"}
                <svelte:component this={popupContent()} />
            {/if}
        </div>
    </div>
{/if}

<style>
    p {
        margin: 0.2rem 0 0.4rem 0;
        font-size: 1rem;
    }

    .popup-content {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-2x-small);
    }

    .title {
        /* width: 100%; */
        font-size: var(--sl-font-size-large);
    }

    .centered {
        text-align: center;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .header sl-copy-button {
        font-size: var(--sl-font-size-medium);
        align-self: center;
        margin-top: -3px;
    }
</style>
