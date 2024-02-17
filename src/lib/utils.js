import { get } from "svelte/store";
import {
  allMarkers,
  itemsCollected,
  points,
  selectedMarker,
  settings,
} from "$lib/stores.js";

export const categories = [
  {
    name: "chest",
    label: "Chests",
    items: [
      "common-chest",
      "uncommon-chest",
      "rare-chest",
      "epic-chest",
      "legendary-chest",
    ],
  },
  {
    name: "collectible",
    label: "Collectibles",
    items: ["bottle", "toy-unicorn", "sheriff-badge", "horseshoe", "brazier"],
  },
  {
    name: "food",
    label: "Food",
    items: [
      "apple",
      "berries",
      "brown-mushroom",
      "carrot",
      "daikon-radish",
      "grapes",
      "honey",
      "lettuce",
      "lemon",
      "orange",
      "pumpkin",
      "purple-carrot",
      "strawberries",
      "truffle",
      "turnip",
      "watermelon",
      "wheat",
      "white-mushroom",
      "zucchini",
    ],
  },
  {
    name: "npc",
    label: "NPCs",
    items: [
      "butterflies-trader",
      "eggs-trader",
      "fish-trader",
      "milk-trader",
      "wool-trader",
    ],
  },
  {
    name: "other",
    label: "Other",
    items: ["cave-entrance", "picnic-basket", "quest-item"],
  },
  {
    name: "resource",
    label: "Resources",
    items: ["butterflies", "eggs", "fish", "milk", "wool"],
  },
  { name: "tack", label: "Tack Upgrade", items: ["leather", "wood"] },
];

export function slugifyName(name) {
  return name.split(" ").join("-").toLowerCase();
}

/**
 * Converts a slugified string to either camel case or sentence.
 * @param {string} name
 * @param {boolean} camelCase
 * @returns {string}
 */
export function unslugifyName(name, camelCase) {
  if (camelCase) {
    return name
      .split("-")
      .map(
        (word, i) => (i > 0 ? word[0].toUpperCase() : word[0]) + word.slice(1),
      )
      .join("");
  } else {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }
}

export const flatNames = categories.flatMap((category) => category.name);
export const flatItems = categories.flatMap((category) => category.items);

export const isToday = (date) => {
  // Check only the first date in the array
  // If there is a date in the second spot, it has been "undone"
  // and shouldn't be considered
  if (date) {
    const date1 = new Date(date);
    const date2 = new Date();

    // If the date, month, and year are the same, it must be today
    return (
      date1.getUTCDate() === date2.getUTCDate() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCFullYear() === date2.getUTCFullYear()
    );
  } else {
    return false;
  }
};

/**
 * Determines if a marker should be considered checked. If it has been checked today, returns 1. If it has been checked before today but not collected since then, returns 0. If the marker is not of the respawning variety, exits the function without returning anything. Otherwise, returns -1.
 * @param {L.Marker} marker
 * @returns {number|void}
 */
export const isChecked = (marker) => {
  if (marker.options.markerType !== "respawning") {
    return;
  }
  const store = get(marker.options.store);

  if (isToday(store.lastChecked[0])) {
    return 1;
  } else if (
    isToday(store.lastCollected[0]) ||
    store.lastCollected[0] < store.lastChecked[0]
  ) {
    return 0;
  } else {
    return -1;
  }
};

export const isCollected = (marker) => {
  const store = get(marker.options.store);

  switch (marker.options.markerType) {
    case "one-time":
      return store.collected ? 1 : -1;
    case "respawning":
      if (isToday(store.lastCollected[0])) {
        return 1;
      } else if (
        store.lastCollected[0] > store.lastChecked[0] &&
        !isToday(store.lastChecked[0])
      ) {
        return 0;
      } else {
        return -1;
      }
  }
};

export function getData() {
  let arr = [];

  get(allMarkers).flatMap((marker) => {
    const store = get(marker.options.store);
    if (marker.options.markerType === "respawning") {
      if (
        store?.lastCollected[0] ||
        store?.lastCollected[1] ||
        store?.lastChecked[0] ||
        store?.lastChecked[1]
      ) {
        arr.push({
          id: marker.options.id,
          ...store,
        });
      }
    } else if (marker.options.markerType === "one-time") {
      if (store?.collected) {
        arr.push({
          id: marker.options.id,
          ...store,
        });
      }
    }
  });

  return arr;
}

/**
 * Get an SVG from the given file path and return its contents as a string.
 * @param {string} path - The path to the SVG file.
 * @returns {Promise<string>}
 */
export async function inlineSvg(path) {
  return await fetch(path)
    .then((res) => res.blob())
    .then((res) => res.arrayBuffer())
    .then((bytes) => {
      let decoder = new TextDecoder("utf-8");
      return decoder.decode(bytes);
    });
}

export const updateStore = (key, e, isUndo) => {
  const stores = {
    settings: get(settings),
    selectedMarker: get(selectedMarker),
  };

  // Either close popups on interact or keep them open
  if (stores.settings.keepSpiderfied && !stores.settings.closePopups) {
    e.stopImmediatePropagation();
  } else if (stores.settings.keepSpiderfied) {
    e.stopPropagation();
    stores.selectedMarker.closePopup();
  }

  let markerStore = get(stores.selectedMarker.options.store);

  if (key === "collected") {
    // Collect/undo one-time item
    stores.selectedMarker.options.store.update(() => ({ collected: !isUndo }));
  } else if (isUndo) {
    // Collect respawning item
    markerStore[key].reverse();
    stores.selectedMarker.options.store.update((s) => ({
      ...s,
      ...markerStore,
    }));
  } else {
    // Undo collect respawning item
    markerStore[key].unshift(new Date());
    markerStore[key] = markerStore[key].slice(0, 2);
    stores.selectedMarker.options.store.update((s) => ({
      ...s,
      ...markerStore,
    }));
  }

  stores.selectedMarker.options.toggle();
  isUndo && stores.selectedMarker.setOpacity(1);

  // If only checking, jump out early instead of updating stats
  if (key === "lastChecked") {
    return;
  }

  // Update statistics
  itemsCollected.update((i) => (i += isUndo ? -1 : 1));

  points.update(
    (num) =>
      (num +=
        (isUndo ? -1 : 1) *
        (stores.selectedMarker.options?.rarity
          ? stores.selectedMarker.options.rarity
          : 0)),
  );
};
