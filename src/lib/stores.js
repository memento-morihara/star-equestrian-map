import { writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
import { categories } from "$lib/utils.js";

export const mapStore = writable();
export const selectedMarker = writable(undefined);
export const windowParams = writable({ width: null, height: null });

let filters = [];
categories.flatMap(
  (category) => (filters = [...filters, ...category.items, category.name]),
);
/**
 * A Skeleton localStorageStore to hold the user's filter selections.
 * @type {Writable<*[]>}
 */
export const filterStore = localStorageStore("filters", filters);

/**
 * Values to initialize or reset the settings.
 * @constant
 * @default
 * @property {boolean} keepOnTop - Whether to pin the window to the top on the desktop app.
 * @property {boolean} closePopups - Whether to keep the popup open when one of its buttons is clicked.
 * @property {boolean} hideCollectedMarkers - Hide collected/checked markers entirely instead of lowering the opacity.
 * @property {number} markerOpacity - The opacity of collected/checked markers.
 */
const defaultSettings = {
  loadImages: true,
  keepOnTop: false,
  closePopups: true,
  hideCollectedMarkers: false,
  markerOpacity: 0.3,
  spiderfyMarkers: true,
  hoverMarkers: false,
  keepSpiderfied: true,
  broncoEnabled: false,
};

let initialStore = {};
export const initSettings = () => {
  for (const key of Object.keys(defaultSettings)) {
    initialStore[key] = defaultSettings[key];
  }
  return initialStore;
};

export const settings = localStorageStore("settings", initSettings());
export const allMarkers = writable([]);

export const collectibleStores = writable([]);

export const points = writable(0);
export const itemsCollected = writable(0);
