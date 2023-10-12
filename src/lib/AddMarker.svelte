<script>
  import { markerData } from "$lib/markerData.js";
  import { onMount } from "svelte";

  export let marker = {};

  let value;
  let description = "";
  let data;

  onMount(async () => data = await markerData());

  function changeIcon() {
    const [category, itemName] = value.split(",");
    const dataCategory = data.find(c => c.name === category);
    const dataItem = dataCategory.items.find(item => item.name === itemName)

    marker.setIcon(dataItem.icon);
  }

  function saveMarker(item, location, description) {
    changeIcon(item);
    marker.closePopup();
    marker.unbindPopup();
  }
</script>

<select bind:value>
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

<textarea bind:value={description}></textarea>

<button on:click={() => saveMarker(value, marker._latlng, description)}>Add Marker</button>
