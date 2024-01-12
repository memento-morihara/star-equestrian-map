<script>
  import { selectedMarker, settings } from "$lib/stores.js";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";

  function updateStore(e) {
    // Prevent popups from closing
    if ($settings.keepSpiderfied && !$settings.closePopups) {
      e.stopImmediatePropagation();
    } else if ($settings.keepSpiderfied) {
      e.stopPropagation();
      $selectedMarker.closePopup();
    }

    $selectedMarker.options.store.update(() => ({ collected: true }));
    $selectedMarker.setOpacity($settings.markerOpacity);
    isCollected = isCollected;
  }

  function undoUpdateStore(e) {
    if ($settings.keepSpiderfied && !$settings.closePopups) {
      e.stopImmediatePropagation();
    } else if ($settings.keepSpiderfied) {
      e.stopPropagation();
      $selectedMarker.closePopup();
    }

    $selectedMarker.options.store.update(() => ({ collected: false }));
    $selectedMarker.setOpacity(1);
    isCollected = isCollected;
  }

  $: isCollected = get($selectedMarker.options.store)?.collected;
</script>

<div class="collect-button">
  {#if isCollected}
    <button
      in:fade
      class="btn variant-ghost-primary"
      on:click={(e) => undoUpdateStore(e)}>Remove
    </button
    >
  {:else}
    <button
      in:fade
      class="btn variant-filled-primary sm:btn-md btn-sm"
      on:click={(e) => updateStore(e)}
    >Collect
    </button>
  {/if}
</div>

<style>
    .collect-button {
        width: 100%;
        text-align: center;
        margin-top: 0.8rem;
    }
</style>
