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
    if (date) {
        const date1 = new Date(date).getUTCDate();
        const date2 = new Date().getUTCDate();

        return date1 === date2;
    } else {
        return false;
    }
}

export const isChecked = (marker) => {
    if (marker.options.markerType !== "respawning") {
        return;
    }
    const store = get(marker.options.store);

    if (store.lastChecked[0] !== null && isToday(store.lastChecked[0])) {
        // If marker has been checked today
        return 1;
    } else if (store.lastChecked[0] !== null && !isToday(store.lastChecked[0]) && new Date(store.lastChecked[0]).getMilliseconds() > new Date(store.lastCollected[0]).getMilliseconds()) {
        // If marker has been checked before today but not collected since
        // Can't compare UTC date since it is checking the value instead of equality,
        // so just use milliseconds
        return 0;
    } else {
        return -1;
    }
}

export const isCollected = (marker) => {
    const store = get(marker.options.store);

    switch (marker.options.markerType) {
        case "one-time":
            return store.collected ? 1 : -1;
        case "respawning":
            if (store.lastCollected[0] !== null && isToday(store.lastCollected[0])) {
                return 1;
            } else if (store.lastChecked[0] !== null && !isToday(store.lastCollected[0])) {
                return 0;
            } else {
                return -1;
            }
    }
}