<script>
  import {allMarkers, settings} from "$lib/stores.js";
  import {getContext} from "svelte";
  import {get} from "svelte/store";
  import {RangeSlider} from "@skeletonlabs/skeleton";

  const map = getContext("map")();

  function isCollected(marker) {
    const lastCollected = get(marker.options.store)?.lastCollected;
    return (
      (lastCollected &&
        new Date(lastCollected).getUTCDate() === new Date().getUTCDate()) ||
      get(marker.options.store)?.collected
    );
  }

  function toggleHiddenMarkers(e) {
    e.target.checked
      ? $allMarkers.forEach((marker) => {
          if (isCollected(marker)) {
            marker.remove();
          }
        })
      : $allMarkers.forEach((marker) => {
          marker.addTo(map);
          isCollected(marker)
            ? marker.setOpacity($settings.markerOpacity)
            : marker.setOpacity(1);
        });
  }

  function changeOpacity() {
    $allMarkers.forEach(
      (marker) =>
        isCollected(marker) && marker.setOpacity($settings.markerOpacity)
    );
  }

  $: $settings.markerOpacity && changeOpacity()
</script>

<section class="text-base align-baseline pl-2.5">
  <h2 class="h3 mb-3">Settings</h2>
  <div class="space-y-3 mx-2">
    {#if window.__TAURI__}
      <label>
        <input
          bind:checked={$settings.keepOnTop}
          class="checkbox"
          id="keep-on-top"
          name="keep-on-top"
          type="checkbox"
        /><span class="ml-2">Keep window on top</span></label
      >
    {/if}
    <label
      ><input
        bind:checked={$settings.closePopups}
        class="checkbox"
        id="close-popups"
        name="close-popups"
        type="checkbox"
      /><span class="ml-2">Close popups automatically on button click</span
      ></label
    >
    <label
      ><input
        bind:checked={$settings.hideCollectedMarkers}
        class="checkbox"
        name="hide-collected"
        on:change={(e) => toggleHiddenMarkers(e)}
        type="checkbox"
      /><span class="ml-2">Hide collected items</span></label
    >
    <div class="flex-col space-y-2">
      <label for="opacity"><span>Collected marker opacity</span></label>
      <RangeSlider accent="accent-primary-500 dark:accent-primary-500" bind:value={$settings.markerOpacity}
                   class="w-2/3" disabled={$settings.hideCollectedMarkers}
                   max="0.9" min="0.1" name="opacity" step="0.1"/>
    </div>
  </div>

  <h2 class="h4 my-3">Reset collected items</h2>
  <div class="space-y-3 mx-2">
    <label
      ><input
        class="checkbox"
        id="save-collected"
        name="save-collected"
        type="checkbox"
      /><span class="ml-2">Preserve non-respawning items</span></label
    >
    <label
      ><input
        class="checkbox"
        id="save-filters"
        name="save-filters"
        type="checkbox"
      /><span class="ml-2">Preserve filter selections</span></label
    >
  </div>
  <button class="btn variant-filled-error mt-3">Reset</button>
</section>
