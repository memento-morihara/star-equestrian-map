<script>
  import { getContext } from "svelte";
  import { selectedMarker } from "$lib/stores.js";
  import PopupContent from "./PopupContent.svelte";

  const marker = getContext("marker")();

  marker.on("click", () => {
      $selectedMarker = marker;
        $selectedMarker.openPopup();
    new PopupContent({
      target: document.getElementById($selectedMarker.options.id),
    });
  });
</script>
