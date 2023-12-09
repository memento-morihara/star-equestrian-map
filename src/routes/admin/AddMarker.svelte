<script>
  import {markerData} from "$lib/markerData.js";
  import {onMount} from "svelte";
  import {PUBLIC_DB_URL} from "$env/static/public";

  export let marker = {};

    let value;
    let description;
    let data;

    onMount(async () => {
        data = await markerData()
        value = marker.options?.category + "," + marker.options?.name;
        description = (marker && marker.options?.description) ?? "";
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
        saveLocation(item.split(",")[1], location.lat, location.lng, description);
        // $customMarkers = [...$customMarkers, {item, location, description}]
    }

    async function saveLocation(name, lat, lng, description, id) {
        const body = `{"name": "${name}", "lat": ${lat}, "lng": ${lng}, "description": "${description}"}`;

        let url = PUBLIC_DB_URL + '/api/collections/locations_new/records';
        // If there was an ID passed, update the record
        if (marker.options.id) {
            id = marker.options.id;
            url += `/${id}`;
        }

        let options = {
            method: marker.options?.id ? 'PATCH' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        };

        fetch(url, options)
            .then(res => res.json())
            .catch(err => console.error('error:' + err));
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
>{marker.options?.id ? "Update" : "Add Marker"}</button
>
