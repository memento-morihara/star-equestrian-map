<script>
  import Marker from "$lib/Marker.svelte";
  import Map from "$lib/Map.svelte";
  import Spiderfier from "$lib/Spiderfier.svelte";
  import CondensedAttribution from "$lib/CondensedAttribution.svelte";
  import Sidebar from "$lib/Sidebar.svelte";
  import { settings, windowParams } from "$lib/stores.js";
  import { page } from "$app/stores";

  export let data = {};
  const { locations, broncoLocations } = JSON.parse($page.data.data);

  let { width } = $windowParams;
</script>

<svelte:head>
  <title>Star Equestrian Map</title>
</svelte:head>

<svelte:window bind:innerWidth={width} />

<Map {data}>
  {#if width >= 300}
    <Sidebar />
  {/if}
  <Spiderfier>
    {#each locations as location}
      <Marker {location} />
    {/each}
    {#if $settings.broncoEnabled}
      {#each broncoLocations as location}
        <Marker {location} isBronco="true" />
      {/each}
    {/if}
  </Spiderfier>
  <CondensedAttribution />
</Map>
