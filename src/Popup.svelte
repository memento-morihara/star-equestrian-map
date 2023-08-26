<script>
    import L from 'leaflet';
    import {getContext, onMount} from 'svelte';
    import Container from "./PopupContent.svelte";
    import {selectedMarkerId} from "./stores.js";

    export let popup = undefined;
    export let collected;
    export let notRespawned;

    const marker = getContext('marker')();

    let container;
    onMount(() => {
            popup = L.popup({minWidth: 210, minHeight: 180, maxWidth: 300})
            marker.bindPopup(popup);
            $selectedMarkerId && (container = new Container({target: $selectedMarkerId.getPopup().getElement().children[0].children[0]}));

            if (marker.options.markerType === "respawning" && collected) {
                marker.setOpacity(0.5);
            } else if (marker.options.markerType === "respawning" && notRespawned) {
                marker.setOpacity(0.5);
            } else if (marker.options.markerType === "one-time" && collected) {
                marker.setOpacity(0.5);
            } else {
                marker.setOpacity(1);
            }
        }
    )

    marker.on('popupopen', () => {
        $selectedMarkerId = marker;
        $selectedMarkerId && (container = new Container({target: $selectedMarkerId.getPopup().getElement().children[0].children[0]}));
    });


    marker.on('popupclose', () => {
        if (container) {
            $selectedMarkerId = undefined;
            // Wait for popup to fade before destroying content
            setTimeout(() =>container.$destroy(), 150);
        }
    });
</script>
