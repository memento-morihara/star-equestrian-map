<script>
  import Marker from "$lib/Marker.svelte";
  import Map from "$lib/Map.svelte";
  import Spiderfier from "$lib/Spiderfier.svelte";
  import CondensedAttribution from "$lib/CondensedAttribution.svelte";
  import Sidebar from "$lib/Sidebar.svelte";
  import { settings, windowParams } from "$lib/stores.js";
  import { page } from "$app/stores";
  import { PUBLIC_BASE_PATH } from "$env/static/public";
  import { base } from "$app/paths";

  const { locations, broncoLocations } = JSON.parse($page.data.data);

  let width;
  $: $windowParams.width = width;
</script>

<svelte:head>
  <title>Star Equestrian Map</title>
  <link rel="manifest" href={base ?? PUBLIC_BASE_PATH + "/manifest.json"} />
</svelte:head>

<svelte:window bind:innerWidth={width} />

<Map>
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
