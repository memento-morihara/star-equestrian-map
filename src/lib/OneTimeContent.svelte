<script>
  import {selectedMarker} from "$lib/stores.js";
  import { get } from "svelte/store";
  import {onMount} from "svelte";

  function updateStore() {
    $selectedMarker.options.store.update(() => ({collected: true}));
    $selectedMarker.setOpacity(0.3);
    isCollected = isCollected;
  }

  function undoUpdateStore() {
    $selectedMarker.options.store.update(() => ({collected: false}));
    $selectedMarker.setOpacity(1);
    isCollected = isCollected;
  }

  $: isCollected = get($selectedMarker.options.store)?.collected;

  onMount(() => {
    if (isCollected) {
      $selectedMarker.setOpacity(0.3);
    }
  })
</script>

<div class="collect-button">
  {#if isCollected}
    <button class="btn variant-ghost-secondary" on:click={undoUpdateStore}>Remove</button>

    {:else}
    <button class="btn variant-filled-primary" on:click={updateStore}>Collect</button>
    {/if}
</div>

<style>
  .collect-button {
    width: 100%;
    text-align: center;
    margin-top: 0.8rem;
  }
</style>
