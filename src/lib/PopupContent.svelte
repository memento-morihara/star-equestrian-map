<script>
    import { selectedMarker } from "$lib/stores.js";
    import OneTimeContent from "./OneTimeContent.svelte";
    import RespawningContent from "./RespawningContent.svelte";
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
    search.set("id", marker.options.id);
</script>

{#if $selectedMarker}
    <div class="popup-content" id={$selectedMarker.options.id}>
        <div class="header">
            <div
                class="title"
                class:centered={!$selectedMarker.options.description &&
                    $selectedMarker.options.markerType === "static"}
            >
                <strong>{$selectedMarker.options.name} </strong>
            </div>
            <sl-copy-button
                value={url.toString()}
                copy-label="Copy permalink"
                success-label="Copied!"
            />
        </div>
        <div
            class="content"
            class:no-desc={$selectedMarker.options.markerType !==
                "respawning" && !$selectedMarker.options.description}
        >
            {#if $selectedMarker.options.markerType !== "respawning" && $selectedMarker.options.description}
                <p class="desc">{$selectedMarker.options.description}</p>
            {/if}
            {#if $selectedMarker.options.markerType !== "static"}
                <svelte:component this={popupContent()} />
            {/if}
        </div>
    </div>
{/if}

<style>
    .desc {
        margin: 0;
        font-size: var(--sl-font-size-medium);
    }

    .popup-content {
        display: flex;
        flex-direction: column;
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
        font-size: var(--sl-font-size-medium);
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0;
    }

    .header sl-copy-button {
        font-size: var(--sl-font-size-medium);
        margin-top: -3px;
    }
</style>
