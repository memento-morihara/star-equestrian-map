import { derived, writable } from "svelte/store";

export const activeTabIndex = writable(1);
export const sidepanelOpen = writable(false);

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

export const stats = [ {
    name: "Stamina",
    food: [ "Wheat", "Strawberries", "White Mushroom", "Grapes" ]
},
{
    name: "Speed",
    food: [ "Apple", "Berries", "Honey", "Royal Jelly" ]
},
{
    name: "Acceleration",
    food: [ "Pumpkin", "Lemon", "Orange", "Zucchini" ]
},
{
    name: "Jump",
    food: [ "Carrot", "Watermelon", "Brown Mushroom", "Purple Carrot" ]
},
{
    name: "Agility",
    food: [ "Lettuce", "Turnip", "Truffle", "Daikon Radish" ]
}
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
    if (name.includes("-") || name.toLowerCase() === name) {
        return name.split("-").map(word => [ word[ 0 ].toUpperCase(), word.slice(1) ].join('')).join(" ")
    } else {
        return name.toLowerCase().split(" ").join("-");
    }
}

export const stat = markerName => {
    let arr = stats.find(s => s.food.includes(markerName));
    return arr?.name;
}


export const shownFilters = writable(ls());

export const selectedMarkerId = writable("");


export const allMarkers = writable([]);
// Store to hold markers currently shown on map as a global state so all components can access it
export const shownMarkers = derived([ shownFilters, allMarkers ], ([ $shownFilters, $allMarkers ]) => $allMarkers.filter(marker => $shownFilters.includes(formatName(marker.options.name))));

export const dialog = writable(false);

export const collectionProgress = writable([])

export const hideCollected = writable(localStorage.getItem("hideCollected"));

export const autoClosePopups = writable(localStorage.getItem("autoClosePopups"));

export const shownStats = writable(JSON.parse(localStorage.getItem("shownStats")) ?? {
    agility: true,
    speed: true,
    stamina: true,
    acceleration: true,
    jump: true
});

export const keepOnTop = writable(false);