<script>
    import { getContext } from "svelte";
    import { browser } from "$app/environment";
    import { selectedMarker } from "$lib/stores.js";
    import PopupContent from "./PopupContent.svelte";
    import { fade } from "svelte/transition";

    const marker = getContext("marker")();
    const map = getContext("map")();

    let popupContent;

    marker.on("click", () => {
        $selectedMarker = marker;

        if ($selectedMarker !== marker || !popupContent) {
            popupContent = new PopupContent({
                target: marker.getPopup().getElement().children[0].children[0],
            });
        }
    });
</script>
