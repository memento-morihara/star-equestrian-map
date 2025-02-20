<script>
  import { RecursiveTreeView } from "@skeletonlabs/skeleton";
  import { categories, flatNames, slugifyName, unslugifyName } from "$lib/utils.js";
  import { getContext, onMount } from "svelte";
  import { allMarkers, filterStore, settings } from "$lib/stores.js";
  import { markerData } from "$lib/markerData.js";
  import CheckIcon from "virtual:icons/bi/check-square";
  import SquareIcon from "virtual:icons/bi/square";
  import { page } from "$app/stores";

  export let map;
  let nodes;
  let L;
  let displayedGroups;

  const groups = getContext("groups")();

  const { counts, countsWithBronco } = JSON.parse($page.data.data);

  const count = (item) =>
    ($settings.broncoEnabled ? countsWithBronco : counts).find(
      (c) => c.name === item
    )?.count ?? 0;
  const getNodes = async () =>
    await markerData().then((data) =>
      data.map((item) => {
        return {
          id: item.name,
          content: item.label,
          children: item.items.map((i) => {
            const itemCount = count(i.name);
            return {
              id: slugifyName(i.name),
              content: `<p>${i.name} (<span id=${slugifyName(i.name)}>${itemCount}</span>)`,
              lead: `<img src=${
                i.icon.createIcon().src
              } alt={i.name} height="24" width="24" />`
            };
          })
        };
      })
    );

  const items = categories.flatMap((c) => c.items);

  // Get all the checked items that aren't categories
  $: itemNodes = $filterStore.filter((item) => !flatNames.includes(item));
  $: itemNodes && toggleFeatureGroup();

  function toggleFeatureGroup() {
    if (!displayedGroups) {
      return;
    }

    // Find the items that are checked but aren't on the map and add them, and vice versa
    const diff = items.filter(
      (item) => itemNodes.includes(item) !== map.hasLayer(groups[item])
    );

    diff.forEach((item) => {
      if (displayedGroups.hasLayer(groups[item])) {
        displayedGroups.removeLayer(groups[item]);
      } else {
        groups[item].addTo(displayedGroups);
      }
    });
  }

  function toggleBronco() {
    $allMarkers.forEach((marker) => {
      if (!marker.options.bronco) {
        return;
      }

      if ($settings.broncoEnabled) {
        map.hasLayer(marker) ||
        (displayedGroups.hasLayer(marker.options.group) &&
          marker.addTo(displayedGroups));
      } else {
        marker.remove();
      }
    });
    items.forEach(
      (item) =>
        (document.getElementById(slugifyName(item)).innerText = count(
          unslugifyName(item, false)
        ))
    );
  }

  onMount(async () => {
    L = await import("leaflet");
    displayedGroups = L.layerGroup().addTo(map);
    $filterStore.forEach(filter => groups[filter] && groups[filter].addTo(displayedGroups));
    nodes = await getNodes();
  });

  function changeAllFilters() {
    if (areAllNodesChecked) {
      $filterStore = [];
    } else {
      $filterStore = nodes.flatMap((c) => [
        ...c.children.map((x) => x.id),
        c.id
      ]);
    }
  }

  $: areAllNodesChecked =
    nodes &&
    $filterStore.length === nodes.flatMap((c) => [...c.children, c]).length;
</script>

<div
  class="chip-container flex flex-row-reverse dark:bg-surface-800 mb-3 w-full text-[0.8rem]"
>
  <button
    class="chip absolute right-2.5 variant-primary"
    on:click={changeAllFilters}
  >
    {#if areAllNodesChecked}
      <CheckIcon />
    {:else}
      <SquareIcon />
    {/if}
    <span class="leading-[1.2rem] my-auto align-text-bottom"
    >{areAllNodesChecked ? "Uncheck all" : "Check all"}</span
    >
  </button>
</div>

<div class="h-full w-full text-sm md:text-base">
  <label class="ml-11 mb-4">
    <input
      bind:checked={$settings.broncoEnabled}
      class="checkbox mr-2.5"
      on:change={toggleBronco}
      type="checkbox"
    />
    <span class="align-middle">Bronco items</span>
  </label>
  <RecursiveTreeView
    bind:checkedNodes={$filterStore}
    multiple
    {nodes}
    regionSummary="hover:bg-transparent max-w-[90%]"
    relational
    selection
  />
</div>
