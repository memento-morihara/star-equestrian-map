<script>
  import { getContext, setContext, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { markerData } from "$lib/markerData";
  import { allMarkers, selectedMarker } from "$lib/stores.js";
  import { slugifyName } from "$lib/utils.js";
  import { localStorageStore } from "@skeletonlabs/skeleton";
  import { get } from "svelte/store";

  export let location;

  let store;
  let marker;
  setContext("marker", () => marker);

  const groups = getContext("groups")();
  function initPopup(marker) {

    marker.bindPopup(
      L.popup({
        minWidth: 210,
        content: `<div id="${marker.options.id}"></div>`,
      })
    );
  }
  if (browser && window) {

    onMount(async () => {
      const props = await markerData().then((data) =>
        data
          .flatMap((obj) => obj.items)
          .find((obj) => obj.name === location.name)
      );
      const L = await import("leaflet");
      marker = L.marker([location.lat, location.lng], {
        id: location.id,
        description: location.description,
        riseOnHover: true,
        store: localStorageStore(location.id, {}),
        ...props,
      });
      initPopup(marker);
      const name = slugifyName(marker.options.name);

      groups[name] && groups[name].addLayer(marker);
      $allMarkers = [...$allMarkers, marker];

      let lastCollected = get(marker.options.store)?.lastCollected;

      if (lastCollected) {
        if (new Date(lastCollected).getUTCDate() === new Date().getUTCDate()) {
          marker.setOpacity(0.3)
        }
      }
    });
  }

  function zoomToMarker() {
    map.setView($selectedMarker.options._latlng, 4);
  }
</script>

{#if marker}
  <slot />
{/if}
