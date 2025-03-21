<script>
  import { getContext, onMount, setContext } from "svelte";
  import { browser } from "$app/environment";
  import { markerData } from "$lib/markerData";
  import { allMarkers, collectibleStores, filterStore, selectedMarker, settings } from "$lib/stores.js";
  import { isChecked, isCollected, slugifyName } from "$lib/utils.js";
  import { localStorageStore } from "@skeletonlabs/skeleton";
  import PopupContent from "$lib/Popup.svelte";

  export let location;
  export let isBronco = false;

  let marker;
  setContext("marker", () => marker);

  const groups = getContext("groups")();
  const map = getContext("map")();

  function initPopup(marker) {
    marker.bindPopup(
      L.popup({
        minWidth: 227,
        content: `<div id="${marker.options.id}"></div>`
      })
    );
  }

  const lsTemplate = (type) => {
    if (type === "respawning") {
      return { lastCollected: [null], lastChecked: [null] };
    } else if (type === "one-time") {
      return {};
    }
  };

  if (browser && window) {
    onMount(async () => {
      const props = await markerData().then((data) =>
        data
          .flatMap((obj) => obj.items)
          .find((obj) => obj.name === location.name)
      );
      const L = await import("leaflet");

      if ($allMarkers.flatMap((m) => m.options?.id).includes(location.id)) {
        return;
      }
      marker = new L.Marker([(location.lat / 2.18475), (location.lng / 2.18675)], {
        id: location.id,
        description: location.description,
        riseOnHover: $settings.hoverMarkers,
        store: localStorageStore(location.id, lsTemplate(props.markerType)),
        bronco: isBronco,
        ...props
      });
      initPopup(marker);

      // Give it a function to show/hide itself
      marker.options.toggle = () => toggleMarkerVisibility(marker);

      const name = slugifyName(marker.options.name);

      const group = groups[name];
      marker.options.group = group;
      group.hasLayer(marker) || group.addLayer(marker);
      $allMarkers = [...$allMarkers, marker];

      marker.on("click", () => {
        $selectedMarker = marker;
        $selectedMarker.openPopup();
        new PopupContent({
          target: document.getElementById($selectedMarker.options.id)
        });
      });

      // Hide or set opacity for markers that have been collected or checked
      if (isCollected(marker) === 1 || isChecked(marker) === 1) {
        if ($settings.hideCollectedMarkers) {
          marker.remove();
        } else {
          marker.setOpacity($settings.markerOpacity);
        }
      }

      // Add collectibles to a store to keep track of progress
      if (
        marker.options.markerType === "one-time" &&
        !["Legendary Chest", "Quest Item"].includes(marker.options.name)
      ) {
        $collectibleStores = [
          ...$collectibleStores,
          {
            name: marker.options.name,
            id: marker.options.id,
            store: marker.options.store,
            bronco: isBronco
          }
        ];
      }
    });
  }

  function toggleMarkerVisibility(marker) {
    if (!$filterStore.includes(slugifyName(marker.options.name))) {
      marker.removeFrom(map);
    } else {
      map.hasLayer(marker) || marker.addTo(map);
    }

    if (isCollected(marker) > 0 || isChecked(marker) > 0) {
      $settings.hideCollectedMarkers ? marker.remove() : marker.setOpacity($settings.markerOpacity);
    } else {
      marker.setOpacity(1);
    }
  }
</script>

{#if marker}
  <slot />
{/if}
