<script>
    import {selectedMarker, settings} from "$lib/stores.js";
    import {get} from "svelte/store";

    function updateStore(e) {
        // Prevent popups from closing
        $settings.closePopups || e.stopPropagation();

      $selectedMarker.options.store.update(() => ({collected: true}));
      $selectedMarker.setOpacity($settings.markerOpacity);
      isCollected = isCollected;
  }

    function undoUpdateStore(e) {
        $settings.closePopups || e.stopPropagation();

        $selectedMarker.options.store.update(() => ({collected: false}));
        $selectedMarker.setOpacity(1);
        isCollected = isCollected;
    }

    $: isCollected = get($selectedMarker.options.store)?.collected;

</script>

<div class="collect-button">
    {#if isCollected}
        <button class="btn variant-ghost-primary" on:click={(e) => undoUpdateStore(e)}>Remove</button>
    {:else}
        <button class="btn variant-filled-primary" on:click={(e) => updateStore(e)}>Collect</button>
    {/if}
</div>

<style>
    .collect-button {
        width: 100%;
        text-align: center;
        margin-top: 0.8rem;
    }
</style>
