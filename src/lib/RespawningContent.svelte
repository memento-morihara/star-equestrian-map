<script>
    import {selectedMarker, settings} from "$lib/stores.js";
    import Time from "svelte-time";
    import {get} from "svelte/store";
    import {fade, slide} from "svelte/transition";
    import {isCollected} from "$lib/utils.js";
    import CalendarIcon from 'virtual:icons/bi/calendar-x';

    $: lastCollected = $selectedMarker.options.markerType === "respawning" && get($selectedMarker.options.store)?.lastCollected[0];
    $: lastChecked = $selectedMarker.options.markerType === "respawning" && get($selectedMarker.options.store)?.lastChecked[0];

    const updateStore = (key, e) => {
        // Prevent popups from closing
        $settings.closePopups || e.stopPropagation()

        let store = get($selectedMarker.options.store);

        // Add current date to the beginning of the array and remove the last item
        store[key].unshift(new Date());
        store[key] = store[key].slice(0, 2);
        $selectedMarker.options.store.update(s => ({...s, ...store}));

        $settings.hideCollectedMarkers
            ? $selectedMarker.on("popupclose", () => $selectedMarker.remove())
            : $selectedMarker.setOpacity($settings.markerOpacity);

        lastChecked = lastChecked;
        lastCollected = lastCollected;
    };

    const undoUpdateStore = (key, e) => {
        $settings.closePopups || e.stopPropagation()

        let store = get($selectedMarker.options.store);

        // Since setArray will always add to the beginning and remove the last item,
        // the two remaining elements will never be the same date and can be swapped safely
        store[key].reverse();
        $selectedMarker.options.store.update(s => ({...s, ...store}));
        $selectedMarker.setOpacity(1);

        lastChecked = lastChecked;
        lastCollected = lastCollected;
    };

    // If the collect/uncollect cycle is repeated, the "old" date is now the first element
    // so it will be preserved
</script>

<div>
    <small class="text-sm pb-0" transition:fade
    >Last collected:
        {#if lastCollected}
            <Time relative timestamp={lastCollected}/>
        {:else}N/A
        {/if}
    </small>
    {#if lastChecked && isCollected($selectedMarker) === 0}
        <div transition:slide>
            <small class="text-sm"
            >Last checked:
                <Time relative timestamp={lastChecked}/>
            </small>
        </div>
    {/if}
</div>
{#if $selectedMarker.options.description}
    <p class="text-base m-0">{$selectedMarker.options.description}</p>
{/if}

{#if isCollected($selectedMarker) > 0}
    <div class="spawn-buttons" in:fade>
        <button
                class="btn variant-ghost-primary"
                on:click={(e) => undoUpdateStore("lastCollected", e)}>Remove
        </button
        >
    </div>
{:else if isCollected($selectedMarker) === 0}
    <div class="spawn-buttons" in:fade>
        <button
                class="btn variant-ghost-primary"
                on:click={(e) => undoUpdateStore("lastChecked", e)}>Remove
        </button
        >
    </div>
{:else}
    <div class="spawn-buttons" in:fade>
        <button
                on:click={(e) => updateStore("lastCollected", e)}
                class="btn variant-filled-primary">Collect
        </button
        >
        <button
                class="no-spawn btn-icon hover:variant-soft-primary h-[42px]"
                title="Not respawned today"
                on:click={(e) => updateStore("lastChecked", e)}
        >
            <CalendarIcon style="font-size:20px"/>
        </button>
    </div>
{/if}


<style>
    p {
        margin: 0.4rem 0 0 0 !important;
        padding: 0;
    }

    .spawn-buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 0.8rem;
    }

    .no-spawn {
        font-size: 1.5rem;
    }
</style>
