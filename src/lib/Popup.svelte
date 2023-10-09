<script>
    import { getContext } from "svelte";
    import { selectedMarker } from "$lib/stores.js";
    import PopupContent from "./PopupContent.svelte";

    const marker = getContext("marker")();

    let popupContent;

    marker.on("click", () => {
        if ($selectedMarker !== marker || !popupContent) {
            $selectedMarker = marker;
            popupContent = new PopupContent({
                target: document.getElementById($selectedMarker.options.id),
            });
        }
    });
</script>
