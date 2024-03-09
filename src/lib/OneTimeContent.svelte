<script>
  import { selectedMarker } from "$lib/stores.js";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  import { updateStore } from "$lib/utils.js";

  function collect(key, e, isUndo) {
    updateStore(key, e, isUndo);
    isCollected = !isUndo;
  }

  $: isCollected = get($selectedMarker.options.store)?.collected;
</script>

<div class="collect-button">
  {#if isCollected}
    <button
      in:fade
      class="btn variant-ghost-primary"
      on:click={(e) => collect("collected", e, true)}
    >Remove
    </button>
  {:else}
    <button
      in:fade
      class="btn variant-filled-primary"
      on:click={(e) => collect("collected", e, false)}
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
