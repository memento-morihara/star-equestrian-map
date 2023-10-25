<script>
  import {LightSwitch} from "@skeletonlabs/skeleton";
  import Marker from "$lib/Marker.svelte";
  import Map from "$lib/Map.svelte";
  import {categories} from "$lib/utils.js";
  import Spiderfier from "$lib/Spiderfier.svelte";
  import CondensedAttribution from "$lib/CondensedAttribution.svelte";
  import Sidebar from "$lib/Sidebar.svelte";

  export let data;
  let initialLocation;

  const locations = Object.values(data.locations);
</script>

<LightSwitch class="absolute right-3 top-3 lightswitch dark:bg-gray-950 z-[500]"/>
<Map {data}>
  <Sidebar/>
  <Spiderfier>
    {#each locations as category, i}
      {#each locations[i] as item}
        {#each item.locations as location}
          <Marker
                  location={{
            name: item.name,
            category: categories.find((c) => c.items.includes(item.name)),
            ...location,
          }}
                  on:markerCreated
          />
        {/each}
      {/each}
    {/each}
  </Spiderfier>
  <CondensedAttribution />
</Map>

<style>
  @import "leaflet-draw/dist/leaflet.draw.css";

  /* TODO: find a better way of doing a dark mode on the toolbars besides inverting the colors */

  :global(.leaflet-container) {
    background-color: var(--bg-surface-300);
  }

  :global(.dark .leaflet-control) {
    filter: invert();
    -webkit-filter: invert();
  }

  :global(.dark .leaflet-draw-actions a) {
    filter: invert();
    -webkit-filter: invert();
  }
</style>
