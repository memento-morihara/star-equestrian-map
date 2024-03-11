<script>
  import { markerData } from "$lib/markerData.js";
  import { onMount } from "svelte";
  import { FileButton } from "@skeletonlabs/skeleton";
  import PocketBase from "pocketbase";
  import { PUBLIC_DB_URL } from "$env/static/public";
  import ImageIcon from "virtual:icons/bi/image";

  export let marker = { options: {} };

  let value;
  let description;
  let data;
  let id;
  let lat;
  let lng;
  let files;
  let media;

  const formData = new FormData();
  const db = new PocketBase(PUBLIC_DB_URL);

  onMount(async () => {
    data = await markerData();
    value = marker.options?.category + "," + marker.options?.name;
    description = (marker && marker.options?.description) ?? "";
    id = marker?.options.id;
    lat = marker?._latlng.lat;
    lng = marker?._latlng.lng;
  });

  function changeIcon() {
    const [category, itemName] = value.split(",");
    const dataCategory = data.find((c) => c.name === category);
    const dataItem = dataCategory.items.find((item) => item.name === itemName);

    marker.setIcon(dataItem.icon);
  }

  function saveMarker(item, location, description) {
    marker.options?.id || changeIcon(item);
    marker.closePopup();
    // marker.unbindPopup();
    saveLocation(
      item.split(",")[1],
      location.lat,
      location.lng,
      description,
      marker.options?.id
    );
  }

  async function saveLocation(name, lat, lng, description, id) {
    const body = { name, lat, lng, description };
    formData.append("media", files[0]);

    Object.keys(body).forEach(key => formData.append(key, body[key]));

    if (id) {
      const response = await db.collection("locations_new").update(id, formData);
      console.log(response);
      marker.options = { ...marker.options, lat, lng, media: response?.media[0] ?? null, name, description };
      console.log(marker);
    } else {
      await db.collection("locations_new").create(formData);
    }
  }
</script>

<div class="w-full flex flex-col gap-0.5">

  <input bind:value={id} class="input mb-1.5" id="id" name="id" type="text" />

  <div class="flex gap-1">
    <input bind:value={lat} class="input" id="lat" name="lat" type="number" />
    <input bind:value={lng} class="input" id="lng" name="lng" type="number" />
  </div>


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

  <div class="flex my-0.5">
    <FileButton bind:files
                name="media"
                button="btn variant-soft-secondary"
    >
      <ImageIcon />
    </FileButton>
    {#if typeof marker.options?.media === "string"}
      <span class="m-auto">{marker.options.media}</span>
    {:else}
      <span class="m-auto">{files ? files[0]?.name : "No file selected"}</span>
    {/if}
  </div>


  <button class="btn variant-filled-primary w-full"
          on:click={() => saveMarker(value, marker._latlng, description, marker.options?.id ?? "")}>
    Update
  </button>
</div>
