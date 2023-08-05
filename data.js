import { atom } from 'nanostores'

const checkboxes = document.querySelectorAll("input[type=checkbox]")
export const items = [ [ 'apple', 'berries', 'carrot', 'brown-mushroom', 'honey', 'lemon', 'lettuce', 'orange', 'pumpkin', 'truffle', 'strawberries', 'turnip', 'watermelon', 'wheat', 'white-mushroom' ], [ 'common-chest', 'uncommon-chest', 'rare-chest', 'epic-chest', 'legendary-chest' ], [ 'butterflies', 'eggs', 'fish', 'milk', 'wool' ], [ 'horseshoe', "message-in-a-bottle", "sheriff's-badge", 'toy-unicorn' ], [ 'picnic-basket', 'wood', 'cave-entrance' ] ]
export const shownItems = localStorage.getItem('shownItems') ? atom(localStorage.getItem('shownItems').split(',')) : atom(items.flat());

export function addItem(item) {
    shownItems.set([ ...shownItems.get(), item ]);
}

export function removeItem(item) {
    shownItems.set(shownItems.get().filter(i => i !== item));
}



checkboxes.forEach(c => {
    shownItems.get().includes(c.value) ? c.checked = true : c.checked = false
})

// Set localStorage whenever shownItems changes
shownItems.listen(shownItems => localStorage.setItem('shownItems', shownItems))