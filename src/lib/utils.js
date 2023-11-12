import {get} from "svelte/store";

export const categories = [{
    name: "chest",
    label: "Chests",
    items: ["common-chest", "uncommon-chest", "rare-chest", "epic-chest", "legendary-chest"]
}, {
    name: "collectible",
    label: "Collectibles",
    items: ["bottle", "toy-unicorn", "sheriff-badge", "horseshoe", "brazier"]
}, {
    name: "food",
    label: "Food",
    items: ["apple", "berries", "brown-mushroom", "carrot", "daikon-radish", "grapes", "honey", "lettuce", "lemon", "orange", "pumpkin", "purple-carrot", "strawberries", "truffle", "turnip", "watermelon", "wheat", "white-mushroom", "zucchini"]
}, {
    name: "npc",
    label: "NPCs",
    items: ["butterflies-trader", "eggs-trader", "fish-trader", "milk-trader", "wool-trader"]
}, {name: "other", label: "Other", items: ["cave-entrance", "picnic-basket", "quest-item"]}, {
    name: "resource",
    label: "Resources",
    items: ["butterflies", "eggs", "fish", "milk", "wool"]
}, {name: "tack", label: "Tack Upgrade", items: ["leather", "wood"]}];

export function slugifyName(name) {
    return name.split(" ").join("-").toLowerCase();
}

export const flatNames = categories.flatMap(category => category.name);
export const flatItems = categories.flatMap(category => category.items);


export const isToday = (date) => {
    // Check only the first date in the array
    // If there is a date in the second spot, it has been "undone"
    // and shouldn't be considered
    if (date[0]) {
        const date1 = new Date(date[0]).getUTCDate();
        const date2 = new Date().getUTCDate();

        return date1 === date2;
    } else {
        return false;
    }
}

export const isCollected = (marker) => {
    const store = get(marker.options.store);

    switch (marker.options.markerType) {
        case "one-time":
            return store.collected ? 1 : -1;
        case "respawning":
            if (isToday(store.lastCollected)) {
                return 1;
            } else if (isToday(store.lastChecked)) {
                return 0;
            } else {
                return -1;
            }
    }
}