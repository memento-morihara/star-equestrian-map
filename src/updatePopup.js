import CollectButtons from "./CollectButtons.svelte";
import UncollectButton from "./UncollectButton.svelte";
import L from "leaflet";

export function updatePopup(node, marker) {
    const lastCollected = localStorage.getItem(`${marker.options.id}.lastCollected`) ?? 0;
    const popup = L.popup();
    return {
        update(popup) {
            if (lastCollected) {
                popup.setContent(UncollectButton);
            } else {
                popup.setContent(CollectButtons);
            }
        },
        destroy() {
            popup.remove();
        }
    }
}