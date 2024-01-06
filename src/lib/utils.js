import { get } from "svelte/store";
import { allMarkers } from "$lib/stores.js";

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
    const date1 = new Date(date).getUTCDate();
    const date2 = new Date().getUTCDate();

    return date1 === date2;
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

  if (store.lastChecked[0] && isToday(store.lastChecked[0])) {
    // If marker has been checked today
    return 1;
  } else if (
    store.lastChecked[0] &&
    !isToday(store.lastChecked[0]) &&
    new Date(store.lastChecked[0]).getTime() >
      new Date(store.lastCollected[0]).getTime()
  ) {
    // If marker has been checked before today but not collected since
    // Can't compare UTC date since it is checking the value instead of equality,
    // so just use milliseconds
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
      if (store.lastCollected[0] && isToday(store.lastCollected[0])) {
        return 1;
      } else if (store.lastChecked[0] && !isToday(store.lastCollected[0])) {
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
