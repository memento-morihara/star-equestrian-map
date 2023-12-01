import {writable} from "svelte/store";
import {localStorageStore} from "@skeletonlabs/skeleton";
import {categories} from "$lib/utils.js";

export const customMarkers = localStorageStore("customMarkers", []);
export const customRoutes = localStorageStore("customRoutes", []);

export const selectedMarker = writable(undefined);

let filters = [];
categories.flatMap(category => filters = [ ...filters, ...category.items, category.name ]);
export const filterStore = localStorageStore("filters", filters);

const defaultSettings = {
    keepOnTop: false,
    closePopups: true,
    hideCollectedMarkers: false,
    markerOpacity: 0.3,
    spiderfyMarkers: true,
    hoverMarkers: false,
    keepSpiderfied: true,
}

let initialStore = {};
export const initSettings = () => {
    for (const key of Object.keys(defaultSettings)) {
        initialStore[key] = defaultSettings[key];
    }
    return initialStore;
}

export const settings = localStorageStore("settings", initSettings());
export const allMarkers = writable([]);

export const collectibleStores = writable([]);