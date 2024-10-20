<script>
  import { markerData } from "$lib/markerData.js";
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";
    import { PUBLIC_DB_PASSWORD, PUBLIC_DB_URL, PUBLIC_DB_USER } from "$env/static/public";

  export let marker = { options: {} };

  let value;
  let description;
  let data;
  let id;
  let lat;
  let lng;

const db = new PocketBase(PUBLIC_DB_URL);

  onMount(async () => {
    data = await markerData();
    value = marker.options?.category + "," + marker.options?.name;
    description = (marker && marker.options?.description) ?? "";
    id = marker?.options.id;
    lat = marker?._latlng.lat;
    lng = marker?._latlng.lng;

    const auth = db.admins.authWithPassword(
      PUBLIC_DB_USER,
      PUBLIC_DB_PASSWORD
    );
  });

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
    saveLocation(
      item.split(",")[1],
      location.lat,
      location.lng,
      description,
      marker.options?.id
    );
  }

  async function saveLocation(name, lat, lng, description, id = "") {
    const body = { name, lat, lng, description };

    if (id) {
      await db.collection("locations_new").update(id, body);
    } else {
      await db.collection("locations_new").create(body);
    }
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

    <button
      class="btn variant-filled-primary mt-1 w-3/4 mx-auto"
      on:click={() => saveMarker(value, marker._latlng, description)}
    >{marker.options?.id ? "Update" : "Add Marker"}</button
    >
  </div>
</div>
