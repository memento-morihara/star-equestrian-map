import {writable} from "svelte/store";
import {stateStore} from "./stores.js";

const state = {};
    const collectedState = writable(state);

export function markerState(marker) {
    switch (marker.options.markerType) {
        case "respawning":
            state.lastCollected = localStorage[marker.options.id + ".lastCollected"];
            state.lastNegativeRespawn = localStorage[marker.options.id + ".lastNegativeRespawn"];
            break;
        case "one-time":
            state.collected = !!localStorage[marker.options.id + ".collected"];
            break;
    }


    function collect() {
        if (marker.options.markerType === "respawning"){
            localStorage.setItem(`${marker.options.id}.lastCollected`, Date.now().toString())
            state.lastCollected = localStorage.getItem(`${marker.options.id}.lastCollected`);
        } else {
            localStorage.setItem(`${marker.options.id}.collected`, "true");
            state.collected = true;
        }
        marker.setOpacity(0.5);
    }

    function noRespawn() {
        localStorage.setItem(`${marker.options.id}.lastNegativeRespawn`, Date.now().toString());
        state.lastNegativeRespawn = localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`)
        marker.setOpacity(0.5);
    }

    async function uncollect() {
        if (marker.options.markerType === "respawning"){
            localStorage.removeItem(`${marker.options.id}.lastCollected`)
            marker.options.lastCollected = null;
        } else {
            localStorage.removeItem(`${marker.options.id}.collected`);
        }
        marker.setOpacity(1);
    }

    return {
        collectedState,
        collect,
        noRespawn,
        uncollect
    }
}