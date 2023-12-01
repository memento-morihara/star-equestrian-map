<script>
    import {selectedMarker} from "$lib/stores.js";
    import OneTimeContent from "./OneTimeContent.svelte";
    import RespawningContent from "./RespawningContent.svelte";
    import {page} from "$app/stores";
    import {clipboard} from "@skeletonlabs/skeleton";
    import CopyIcon from 'virtual:icons/bi/copy';

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
    <div class="popup-content">
        <div class="header">
            <div
                class="title"
                class:centered={!$selectedMarker.options.description &&
                    $selectedMarker.options.markerType === "static"}
            >
                <strong class="h4">{$selectedMarker.options.name} </strong>
            </div>
            <button
                class="btn-icon-md text-lg mx-2"
                title="Copy permalink"
                use:clipboard={url}
            >
                <CopyIcon style="font-size:1rem"/>
            </button>
        </div>
        <div
            class:no-desc={$selectedMarker.options.markerType !==
                "respawning" && !$selectedMarker.options.description}
        >
            {#if $selectedMarker.options.markerType !== "respawning" && $selectedMarker.options.description}
                <p class="text-base my-0">{$selectedMarker.options.description}</p>
            {/if}
            {#if $selectedMarker.options.markerType !== "static"}
                <svelte:component this={popupContent()} />
            {/if}
        </div>
    </div>
{/if}

<style>
    p {
        margin: 0.4rem 0 0 0 !important;
    }

    .popup-content {
        display: flex;
        flex-direction: column;
    }

    .centered {
        text-align: center;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 0;
    }
</style>
