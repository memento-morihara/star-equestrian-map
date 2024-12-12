<script>
  import { markerData } from "$lib/markerData.js";
  import { onMount } from "svelte";

  export let marker = { options: {} };

  let value;
  let description;
  let data;
  let id;
  let lat;
  let lng;
  let region = "";

  onMount(async () => {
    data = await markerData();
    value = marker.options?.category + "," + marker.options?.name;
    description = (marker && marker.options?.description) ?? "";
    id = marker?.options.id;
    lat = marker?._latlng.lat;
    lng = marker?._latlng.lng;
    region = marker.options.region;
  });

  function changeIcon() {
    const [category, itemName] = value.split(",");
    const dataCategory = data.find((c) => c.name === category);
    const dataItem = dataCategory.items.find((item) => item.name === itemName);

    marker.setIcon(dataItem.icon);
  }

  async function saveMarker(item, location, description) {
    changeIcon(item);
    marker.closePopup();
    marker.unbindPopup();

    await fetch("/admin/api/marker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: marker.options.id,
        name: item.split(",")[1],
        lat: location.lat,
        lng: location.lng,
        description: description,
        region: region
      })
    });
  }
</script>

<div class="w-full">
  <div>
    <input bind:value={id} class="input mb-1.5" id="id" name="id" type="text" />

    <div class="flex gap-1">
      <input bind:value={lat} class="input" id="lat" name="lat" type="number" />
      <input bind:value={lng} class="input" id="lng" name="lng" type="number" />
    </div>
  </div>
  <div class="w-full">
    <select
      bind:value
      class="select dark:text-on-surface-token my-1"
      id="name"
      name="name"
    >
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
      bind:value={description}
      class="textarea dark:text-on-surface-token"
      id="description"
      name="description"
    />

    <select bind:value={region}
            class="select dark:text-on-surface-token my-1"
            id="region"
            name="region">
      <option value=""></option>
      <option value="Agricola">Agricola</option>
      <option value="Agricolan Riviera">Agricolan Riviera</option>
      <option value="Bronco">Bronco</option>
      <option value="Heartside">Heartside</option>
      <option value="Redwood Forest">Redwood</option>
    </select>

    <button
      class="btn variant-filled-primary mt-1 w-3/4 mx-auto"
      on:click={() => saveMarker(value, marker._latlng, description)}
    >{marker.options?.id ? "Update" : "Add Marker"}</button
    >
  </div>
</div>
