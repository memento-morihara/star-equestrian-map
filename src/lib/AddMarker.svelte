<script>
  import { markerData } from "$lib/markerData.js";
  import { onMount, createEventDispatcher } from "svelte";
  import { customMarkers } from "$lib/stores.js";

  export let marker = {};

  let value;
  let description = "";
  let data;

  const dispatch = createEventDispatcher();

  onMount(async () => (data = await markerData()));

  function changeIcon() {
    const [category, itemName] = value.split(",");
    const dataCategory = data.find((c) => c.name === category);
    const dataItem = dataCategory.items.find((item) => item.name === itemName);

    marker.setIcon(dataItem.icon);
  }

  function saveMarker(item, location, description) {
    changeIcon(item);
    marker.closePopup();
    marker.unbindPopup();
    dispatch("markerCreated", {item, location, description});
    $customMarkers = [...$customMarkers, {item, location, description}]
  }
</script>

<select class="select dark:text-on-surface-token my-1" bind:value>
  {#await markerData() then data}
    {#each data as group}
      <optgroup label={group.name}>
        {#each group.items as item}
          <option value={`${group.name},${item.name}`}>{item.name}</option>
        {/each}
      </optgroup>
    {/each}
  {/await}
</select>

<textarea
  class="textarea dark:text-on-surface-token"
  bind:value={description}
/>

<button
  class="btn variant-filled-primary"
  on:click={() => saveMarker(value, marker._latlng, description)}
  >Add Marker</button
>
