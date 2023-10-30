import {writable} from "svelte/store";
import {localStorageStore} from "@skeletonlabs/skeleton";
import {categories} from "$lib/utils.js";

export const customMarkers = localStorageStore("customMarkers", []);
export const customRoutes = localStorageStore("customRoutes", []);

export const selectedMarker = writable(undefined);

export const searchParams = writable();

let filters = [];
categories.flatMap(category => filters = [...filters, ...category.items, category.name]);
export const filterStore = localStorageStore("filters", filters);

export const settings = localStorageStore("settings", {
    keepOnTop: false,
    closePopups: true,
    hideCollectedMarkers: false,
    markerOpacity: 0.3,
});
export const allMarkers = writable([]);
