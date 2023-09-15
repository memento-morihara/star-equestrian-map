<script>
    import { getContext } from "svelte";
    import { browser } from "$app/environment";
    import { selectedMarker } from "$lib/stores.js";
    import PopupContent from "./PopupContent.svelte";

    const marker = getContext("marker")();
    const map = getContext("map")();

    let popupContent;

    marker.on("click", () => {
        $selectedMarker = marker;
        // Instantiate the correct type of content into the Leaflet popup in the DOM
        popupContent = new PopupContent({
            target: $selectedMarker.getPopup().getElement().children[0]
                .children[0],
        });
    });
</script>

<div />
