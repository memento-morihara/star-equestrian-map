import {derived, writable} from "svelte/store";
import {localStorageStore} from "@skeletonlabs/skeleton";
import {categories} from "$lib/utils.js";

export const customMarkers = localStorageStore("customMarkers", []);
export const customRoutes = localStorageStore("customRoutes", []);

export const lastCollectedDates = localStorageStore("lastCollectedDates", {});
export const activeFilters = localStorageStore("activeFilters", [ {
    name: "Food",
    items: [
        { name: "Apple", enabled: true },
        { name: "Brown Mushroom", enabled: true },
        { name: "Berries", enabled: true },
        { name: "Lettuce", enabled: true },
    ]
},
{
    name: "Collectibles",
    items: [
        { name: "Bottle", enabled: true },
        { name: "Horseshoe", enabled: true },
        { name: "Sheriff Badge", enabled: true },
        { name: "Toy Unicorn", enabled: true },
    ]
},
{
    name: "Chests",
    items: [
        { name: "Common", enabled: true },
        { name: "Uncommon", enabled: true },
        { name: "Rare", enabled: true },
        { name: "Epic", enabled: true },
        { name: "Legendary", enabled: true },
    ]
}
].toString());

export const selectedMarker = writable(undefined);

export const searchParams = writable();

let filters = [];
const initialFilters = categories.flatMap(category => filters = [...filters, ...category.items, category.name]);
export const filterStore = localStorageStore("filters", filters);

export const items = [ {
    parent: "Food",
    children: [ "apple", "berries", "brown-mushroom", "carrot", "daikon-radish", "grapes", "honey", "lemon", "lettuce", "orange", "pumpkin", "purple-carrot", "strawberries", "truffle", "turnip", "watermelon", "wheat", "white-mushroom", "zucchini", ]
},
    { parent: "Chests", children: [ "common-chest", "uncommon-chest", "rare-chest", "epic-chest", "legendary-chest" ] },
    { parent: "Resources", children: [ "butterflies", "eggs", "fish", "milk", "wool" ] },
    { parent: "Traders", children: [ "butterflies-trader", "eggs-trader", "fish-trader", "milk-trader", "wool-trader" ] },
    { parent: "Collectibles", children: [ "bottle", "horseshoe", "sheriff-badge", "toy-unicorn" ] },
    { parent: "Other", children: [ "brazier", "cave-entrance", "leather", "picnic-basket", "quest-item", "wood" ] }
]

// let ls = () => {
//     if (!localStorage.getItem("shownItems")) {
//         localStorage.setItem("shownItems", items.map(item => item.children).flat())
//         return items.map(item => item.children).flat();
//     } else {
//         return localStorage.getItem("shownItems").split(",");
//     }
// }

const lsStore = localStorageStore("shownItems", items.map(item => item.children.flat()))

// export function formatName(name) {
//     if (name.includes("-") || name.toLowerCase() === name) {
//         return name.split("-").map(word => [ word[ 0 ].toUpperCase(), word.slice(1) ].join('')).join(" ")
//     } else {
//         return name.toLowerCase().split(" ").join("-");
//     }
// }

// export const stat = markerName => {
//     let arr = stats.find(s => s.food.includes(markerName));
//     return arr?.name;
// }


export const shownFilters = writable();

// export const selectedMarkerId = writable("");


export const allMarkers = writable([]);
// // Store to hold markers currently shown on map as a global state so all components can access it
export const shownMarkers = derived([ shownFilters, allMarkers ], ([ $shownFilters, $allMarkers ]) => $allMarkers.filter(marker => $shownFilters.includes(formatName(marker.options.name))));

// export const dialog = writable(false);

// export const collectionProgress = writable([])

// export const hideCollected = writable(localStorage.getItem("hideCollected"));

// export const autoClosePopups = writable(localStorage.getItem("autoClosePopups"));

// export const shownStats = writable(JSON.parse(localStorage.getItem("shownStats")) ?? {
//     agility: true,
//     speed: true,
//     stamina: true,
//     acceleration: true,
//     jump: true
// });

// export const keepOnTop = writable(false);