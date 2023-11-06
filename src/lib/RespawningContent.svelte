<script>
    import { selectedMarker, settings } from "$lib/stores.js";
    import Icon from "@iconify/svelte";
    import Time from "svelte-time";
    import { get } from "svelte/store";
    import { fade } from "svelte/transition";

    function isSameDay(date) {
        return new Date(date).getUTCDate() === new Date().getUTCDate();
    }

    $: lastCollected = get($selectedMarker.options.store)?.lastCollected[0];
    $: lastChecked = get($selectedMarker.options.store)?.lastChecked[0];
    $: isCollected = lastCollected && isSameDay(new Date(lastCollected));
    $: isChecked = lastChecked && isSameDay(new Date(lastChecked));

    // Add current date to the beginning of the array and remove the last item
    const setArray = (store, key) => {
        store[key].unshift(new Date());
        return store[key].slice(0, 2);
    };
    // Since setArray will always add to the beginning and remove the last item,
    // the two remaining elements will never be the same date and can be swapped safely
    const undoSetArray = (store, key) => {
        return store[key].reverse();
    };
    // If the collect/uncollect cycle is repeated, the "old" date is now the first element
    // so it will be preserved

    const updateStore = (key) => {
        $selectedMarker.options.store.update((store) => ({
            ...store,
            lastCollected: setArray(store, key),
        }));

        $settings.hideCollectedMarkers
            ? $selectedMarker.on("popupclose", () => $selectedMarker.remove())
            : $selectedMarker.setOpacity($settings.markerOpacity);

        lastChecked = lastChecked;
        lastCollected = lastCollected;
    };

    const undoUpdateStore = (key) => {
        $selectedMarker.options.store.update((store) => ({
            ...store,
            lastChecked: undoSetArray(store, key),
        }));
        $selectedMarker.setOpacity(1);

        lastChecked = lastChecked;
        lastCollected = lastCollected;
    };
</script>

<div>
    <small class="text-sm pb-0"
        >Last collected:
        {#if lastCollected}
            <Time relative timestamp={lastCollected} />
        {:else}N/A
        {/if}
    </small>
    {#if lastChecked && !isCollected}
        <small class="text-sm" in:fade
            >Last checked:
            <Time relative timestamp={lastChecked} />
        </small>
    {/if}
</div>
{#if $selectedMarker.options.description}
    <p class="text-base">{$selectedMarker.options.description}</p>
{/if}
<div class="spawn-buttons">
    {#if isCollected}
        <button
            class="btn variant-ghost-primary"
            on:click={() => undoUpdateStore("lastCollected")}>Remove</button
        >
    {:else if isChecked}
        <button
            class="btn variant-ghost-primary"
            on:click={() => undoUpdateStore("lastChecked")}>Remove</button
        >
    {:else}
        <button
            on:click={() => updateStore("lastCollected")}
            class="btn variant-filled-primary">Collect</button
        >
        <button
            class="no-spawn btn-icon hover:variant-soft-primary"
            title="Not respawned today"
            on:click={(e) => updateStore("lastChecked")}
        >
            <Icon icon="bi:calendar-x" />
        </button>
    {/if}
</div>

<style>
    /* p {
        margin: 0.7rem 0 0 0 !important;
        padding: 0;
    } */

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
