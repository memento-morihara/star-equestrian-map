<script>
  import { selectedMarker } from "$lib/stores.js";
  import Icon from "@iconify/svelte";
  import Time from "svelte-time";
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  import {onMount} from "svelte";

  $: lastCollected = get($selectedMarker.options.store)?.lastCollected;
  $: lastChecked = get($selectedMarker.options.store)?.lastChecked;
  $: isCollected = new Date(lastCollected).getUTCDate() === new Date().getUTCDate();
  $: isChecked = new Date(lastChecked).getUTCDate() === new Date().getUTCDate();
  const updateStore = (key) => {
    if (key === "lastCollected") {
      $selectedMarker.options.store.update((store) => ({...store, lastCollected: new Date()}));
      // Reassignment to trigger reactivity
      lastCollected = lastCollected;
      $selectedMarker.setOpacity(0.3);
      isCollected = true;
    } else if (key === "lastChecked") {
      $selectedMarker.options.store.update((store) => ({...store, lastChecked: new Date()}));
      $selectedMarker.setOpacity(0.3)
      lastChecked = lastChecked;
      isChecked = true;
    }
  }

  const undoUpdateStore = () => {
    if (isCollected) {
      $selectedMarker.options.store.update((store) => ({...store, lastCollected: new Date(store.previousCollected).getUTCDate() === new Date().getUTCDate() ? null : store.previousCollected}));
      $selectedMarker.setOpacity(1);
      lastCollected = lastCollected;
      isCollected = false;
    } else if (isChecked) {
      $selectedMarker.options.store.update(store => ({...store, lastChecked: new Date(store.previousChecked).getUTCDate() === new Date().getUTCDate() ? null : store.previousChecked}))
      $selectedMarker.setOpacity(1);
      lastChecked = lastChecked;
      isChecked = false;
    }
  }

  onMount(() => {
    if (isCollected || isChecked) {
      $selectedMarker.setOpacity(0.3);
    }
  })
</script>

<div>
  <small>Last collected: {#if lastCollected}<Time relative timestamp={get($selectedMarker.options.store)?.lastCollected} />{:else}N/A{/if}</small>
  {#if lastChecked}<br /><small in:fade>Last checked: <Time relative timestamp={lastChecked} /></small>{/if}
</div>
{#if $selectedMarker.options.description}
  <p>{$selectedMarker.options.description}</p>
{/if}
<div class="spawn-buttons">
  {#if isCollected}
    <button class="btn variant-ghost-primary" on:click={() => undoUpdateStore()}>Remove</button>
  {:else if isChecked}
    <button class="btn variant-ghost-secondary" on:click={() => undoUpdateStore()}>Remove</button>
  {:else}


  <button on:click={() => updateStore("lastCollected")} class="btn variant-filled-primary">Collect</button>
  <button
    class="no-spawn btn-icon hover:variant-soft-primary"
    title="Not respawned today"     on:click={(e) => updateStore("lastChecked")}><Icon icon="bi:calendar-x"
  /></button>
    {/if}

</div>

<style>
  small {
    font-size: 0.78rem;
  }

  p {
    margin: 0.7rem 0 0 0 !important;
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
