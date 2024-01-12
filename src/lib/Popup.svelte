<script>
  import { selectedMarker } from "$lib/stores.js";
  import OneTimeContent from "./OneTimeContent.svelte";
  import RespawningContent from "./RespawningContent.svelte";
  import { page } from "$app/stores";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { inlineSvg } from "$lib/utils.js";

  const popupContent = () => {
    switch ($selectedMarker.options.markerType) {
      case "respawning":
        return RespawningContent;
      case "one-time":
        return OneTimeContent;
    }
  };

  export let marker = $selectedMarker;
  let statIcon;
  const url = new URL($page.url);
  const search = url.searchParams;
  marker && search.set("id", marker.options.id);

  $: isCopied = false;

  // Get the stat icon as a string to inline so the fill can be changed
  if (marker.options.category !== "food") {
    statIcon = "";
  } else {
    statIcon = inlineSvg(`/icons/${marker.options.stat}.svg`);
  }
</script>

{#if marker}
  <div class="popup-content w-full">
    <div class="header flex justify-start">
      <button
        class="btn-icon-md text-lg pr-2.5"
        class:centered={!marker?.options.description.length &&
          marker.options.markerType === "static"}
        title={isCopied ? "Copied!" : "Copy permalink"}
        use:clipboard={url}
        on:click={() => (isCopied = true)}
      >
        <span class="title">
          <strong class="md:h4 h6">{marker.options.name}</strong>
          {#if isCopied}&checkmark;{/if}
        </span>
      </button>
      {#if marker.options.category === "food"}
        {#await statIcon then icon}
          {@html `<div class="w-[24px] h-[24px] object-contain my-auto align-middle dark:fill-white">${icon}</div>`}
        {/await}
      {/if}
    </div>
    <div
      class:no-desc={marker.options.markerType !== "respawning" &&
        !marker.options.description}
    >
      {#if marker.options.markerType !== "respawning" && marker.options.description}
        <p class="text-base my-0">{marker.options.description}</p>
      {/if}
      {#if marker.options.markerType !== "static"}
        <svelte:component this={popupContent()} />
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
