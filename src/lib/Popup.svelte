<script>
    import {selectedMarker} from "$lib/stores.js";
    import OneTimeContent from "./OneTimeContent.svelte";
    import RespawningContent from "./RespawningContent.svelte";
    import {page} from "$app/stores";
    import {clipboard} from "@skeletonlabs/skeleton";

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
    $selectedMarker && search.set("id", marker.options.id);

    $: isCopied = false;
    // $selectedMarker.on("popupclose", () => setTimeout(() => isCopied = false, 300));
</script>

{#if $selectedMarker}
    <div class="popup-content w-full">
        <div class="header flex justify-start">
            <button
                    class="btn-icon-md text-lg pr-2.5"
                    class:centered={!$selectedMarker?.options.description.length &&
                    $selectedMarker.options.markerType === "static"}
                    title={isCopied ? "Copied!" : "Copy permalink"}
                    use:clipboard={url}
                    on:click={() => isCopied = true}
            >
            <span
                    class="title"
            >
                <strong class="h4">{$selectedMarker?.options.name}</strong>
                {#if isCopied}&checkmark;{/if}
            </span>
            </button>
            {#if $selectedMarker?.options.category === "food"}
                <img class="mr-5"
                     src={`icons/${$selectedMarker?.options.stat}.svg`}
                     alt={$selectedMarker?.options.stat}
                     title={$selectedMarker?.options.stat}
                     width="22"
                     height="22"/>
            {/if}
        </div>
        <div
                class:no-desc={$selectedMarker.options.markerType !==
                "respawning" && !$selectedMarker.options.description}
        >
            {#if $selectedMarker.options.markerType !== "respawning" && $selectedMarker.options.description}
                <p class="text-base my-0">{$selectedMarker.options.description}</p>
            {/if}
            {#if $selectedMarker.options.markerType !== "static"}
                <svelte:component this={popupContent()}/>
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
        margin-left: auto;
        margin-right: auto;
    }

    .header {
        display: flex;
        flex-direction: row;
        margin: 0;
    }
</style>
