<script>
  import { selectedMarker, settings } from "$lib/stores.js";
  import Time from "svelte-time";
  import { get } from "svelte/store";
  import { fade, slide } from "svelte/transition";
  import { isChecked, isCollected, updateStore } from "$lib/utils.js";
  import CalendarIcon from "virtual:icons/bi/calendar-x";

  let screenWidth;

  $: lastCollected =
    $selectedMarker.options.markerType === "respawning" &&
    get($selectedMarker.options.store)?.lastCollected[0];
  $: lastChecked =
    $selectedMarker.options.markerType === "respawning" &&
    get($selectedMarker.options.store)?.lastChecked[0];

  function collect(key, e, isUndo) {
    updateStore(key, e, isUndo);
    lastCollected = lastCollected;
    lastChecked = lastChecked;
  }

  // Add a delay if popups are closed automatically to prevent
  // the animation from playing while the popup closes
  const animParams = { delay: $settings.closePopups ? 200 : 0 };
</script>

<svelte:window bind:innerWidth={screenWidth} />
<div>
  <small class="text-sm pb-0" transition:fade
  >Last collected:
    {#if lastCollected}
      <span in:fade><Time relative timestamp={lastCollected} /></span>
    {:else}
      <span in:fade>N/A</span>
    {/if}
  </small>
  {#if isChecked($selectedMarker) > -1 && isCollected($selectedMarker) !== 1}
    <div transition:slide={animParams}>
      <small class="text-sm"
      >Last checked:
        <Time relative timestamp={lastChecked} />
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
      on:click={(e) => collect("lastCollected", e, true)}
    >Remove
    </button>
  </div>
{:else if isChecked($selectedMarker) > 0}
  <div class="spawn-buttons" in:fade>
    <button
      class="btn variant-ghost-primary"
      on:click={(e) => collect("lastChecked", e, true)}
    >Remove
    </button>
  </div>
{:else}
  <div class="spawn-buttons" in:fade>
    <button
      on:click={(e) => collect("lastCollected", e, false)}
      class="btn variant-filled-primary"
    >Collect
    </button>
    <button
      class="no-spawn btn-icon hover:variant-soft-primary h-[42px]"
      title="Not respawned today"
      on:click={(e) => collect("lastChecked", e, false)}
    >
      <CalendarIcon style="font-size:20px" />
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
