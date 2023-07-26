import { persistentMap } from './lib/nanostores-persistent.js';

export const settings = persistentMap('settings:', {
    'shownItems': []
});
// Get the value of shownItems from localStorage
let shownItems = settings.get().shownItems.length > 0 ? settings.get().shownItems : [];
let checkboxes = document.querySelectorAll('input[type=checkbox]');

export function initFilter() {

    // If nothing was in localStorage, add all items to shownItems
    if (shownItems.length < 1) {
        checkboxes.forEach(item => shownItems.push(item.value))
    } else {
        // Turn the string from localStorage into an array
        shownItems = shownItems.split(',')
    }

    checkboxes.forEach(c => shownItems.includes(c.value) ? c.checked = true : c.checked = false);

    // Return the array to use to show the correct icons on the map
    return shownItems;
}

export function updateShownItems(isAdding, item) {
    if (isAdding) {
        settings.setKey('shownItems', [ ...shownItems, item ]);
    } else {
        settings.setKey('shownItems', shownItems.filter(x => x !== item));
    }
}