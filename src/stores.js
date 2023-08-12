import {writable, derived} from "svelte/store";

export const activeTabIndex = writable(1);
export const sidepanelOpen = writable(false);

export const items = [{parent: "Food", children: ["apple", "berries", "brown-mushroom", "carrot", "honey", "lemon", "lettuce", "orange", "pumpkin", "strawberries", "truffle", "turnip", "watermelon", "wheat", "white-mushroom" ]},
    {parent: "Chests", children: ["common-chest", "uncommon-chest", "rare-chest", "epic-chest", "legendary-chest"]},
    {parent: "Resources", children: ["butterflies", "eggs", "fish", "milk", "wool"]},
    {parent: "Collectibles", children: ["bottle", "horseshoe", "sheriff-badge", "toy-unicorn"]},
    {parent: "Other", children: ["cave-entrance", "picnic-basket", "wood"]}
]

let ls = () => {
    if (!localStorage.getItem("shownItems")) {
        localStorage.setItem("shownItems", items.map(item => item.children).flat())
        return items.map(item => item.children).flat();
    } else {
        return localStorage.getItem("shownItems").split(",");
    }
}

export function formatName(name) {
    if (name.includes("-") || name.toLowerCase() === name)
    {
        return name.split("-").map(word => [word[0].toUpperCase(), word.slice(1)].join('')).join(" ")
    } else {
        return name.toLowerCase().split(" ").join("-");
    }
}


export const shownFilters = writable(ls());

export const selectedMarkerId = writable("");


export const allMarkers = writable([]);
// Store to hold markers currently shown on map as a global state so all components can access it
export const shownMarkers = derived([shownFilters, allMarkers], ([$shownFilters, $allMarkers]) => $allMarkers.filter(marker => $shownFilters.includes(formatName(marker.options.name))));

export const dialog = writable(false);