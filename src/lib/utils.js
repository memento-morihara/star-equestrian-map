export const categories = [ { name: "chest", label: "Chests", items: [ "common-chest", "uncommon-chest", "rare-chest", "epic-chest", "legendary-chest" ] }, { name: "collectible", label: "Collectibles", items: [ "bottle", "toy-unicorn", "sheriff-badge", "horseshoe", "brazier" ] }, { name: "food", label: "Food", items: [ "apple", "berries", "brown-mushroom", "carrot", "daikon-radish", "grapes", "lettuce", "lemon", "orange", "pumpkin", "purple-carrot", "strawberries", "turnip", "watermelon", "wheat", "zucchini" ] }, { name: "npc", label: "NPCs", items: [ "butterfly-trader", "eggs-trader", "fish-trader", "milk-trader", "wool-trader" ] }, { name: "other", label: "Other", items: [ "quest-item", "picnic-basket" ] }, { name: "resource", label: "Resources", items: [ "butterflies", "eggs", "fish", "milk", "wool" ] }, { name: "tack", label: "Tack Upgrade", items: [ "leather", "wood" ] } ];

export function slugifyName(name) {
    return name.split(" ").join("-").toLowerCase();
}

export const flatNames = categories.flatMap(category => category.name);
export const flatItems = categories.flatMap(category => category.items);
