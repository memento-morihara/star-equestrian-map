import { derived, writable } from "svelte/store";

export const activeFilters = writable([ {
    name: "Food",
    enabled: true,
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
]);

export const selectedMarker = writable({});

// let ls = () => {
//     if (!localStorage.getItem("shownItems")) {
//         localStorage.setItem("shownItems", items.map(item => item.children).flat())
//         return items.map(item => item.children).flat();
//     } else {
//         return localStorage.getItem("shownItems").split(",");
//     }
// }

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


// export const shownFilters = writable(ls());

// export const selectedMarkerId = writable("");


// export const allMarkers = writable([]);
// // Store to hold markers currently shown on map as a global state so all components can access it
// export const shownMarkers = derived([ shownFilters, allMarkers ], ([ $shownFilters, $allMarkers ]) => $allMarkers.filter(marker => $shownFilters.includes(formatName(marker.options.name))));

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