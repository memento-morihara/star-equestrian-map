import { browser } from "$app/environment";

export const markerData = async () => {
    if (browser) {
        const L = await import("leaflet");

        const scaleIcons = (dimensions, targetSize) => {
            const scale =
                dimensions[0] > dimensions[1]
                    ? targetSize / dimensions[0]
                    : targetSize / dimensions[1];
            return [scale * dimensions[0], scale * dimensions[1]];
        };

        const food = [
            {
                name: "Apple",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-apple.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                rarity: 1,
                category: "food",
                stat: "speed",
            },
            {
                name: "Berries",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-blueberry.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                rarity: 2,
                category: "food",
                stat: "speed",
            },
            {
                name: "Brown Mushroom",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-mush-brown.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                rarity: 3,
                category: "food",
                stat: "jump",
            },
            {
                name: "Carrot",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-carrot.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 1,
                respawnTime: 1,
                category: "food",
                stat: "jump",
            },
            {
                name: "Daikon Radish",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-daikon.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                category: "food",
                markerType: "respawning",
                rarity: 4,
                stat: "agility",
            },
            {
                name: "Grapes",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-grapes.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                category: "food",
                markerType: "respawning",
                rarity: 4,
                stat: "stamina",
            },
            {
                name: "Honey",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-honey.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                rarity: 3,
                stat: "speed",
            },
            {
                name: "Lemon",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-lemon.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "food",
                stat: "acceleration",
            },
            {
                name: "Lettuce",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-lettuce.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 1,
                respawnTime: 1,
                category: "food",
                stat: "agility",
            },
            {
                name: "Orange",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-orange.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 3,
                respawnTime: 1,
                category: "food",
                stat: "acceleration",
            },
            {
                name: "Pumpkin",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-pumpkin.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 1,
                respawnTime: 1,
                category: "food",
                stat: "acceleration",
            },
            {
                name: "Purple Carrot",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-carrot-purple.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                category: "food",
                markerType: "respawning",
                rarity: 4,
                stat: "jump",
            },
            {
                name: "Strawberries",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-strawberry.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "food",
                stat: "stamina",
            },
            {
                name: "Truffle",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-truffle.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 3,
                respawnTime: 1,
                category: "food",
                stat: "agility",
            },
            {
                name: "Turnip",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-turnip.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "food",
                stat: "agility",
            },
            {
                name: "Watermelon",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-watermelon.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "food",
                stat: "jump",
            },
            {
                name: "Wheat",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-wheat.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 1,
                respawnTime: 1,
                category: "food",
                stat: "stamina",
            },
            {
                name: "White Mushroom",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-mush-white.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 3,
                respawnTime: 1,
                category: "food",
                stat: "stamina",
            },
            {
                name: "Zucchini",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-zucchini.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                category: "food",
                markerType: "respawning",
                rarity: 4,
                stat: "acceleration",
            },
        ];

        const resources = [
            {
                name: "Butterflies",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-butterfly.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "resource",
            },
            {
                name: "Eggs",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-egg.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "resource",
            },
            {
                name: "Fish",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-fish.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "resource",
            },
            {
                name: "Milk",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-milk.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "resource",
            },
            {
                name: "Wool",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-wool.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "resource",
            },
        ];

        const traders = [
            {
                name: "Butterflies Trader",
                icon: new L.Icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [18, 18],
                }),
                markerType: "static",
                category: "npc",
            },
            {
                name: "Eggs Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [18, 18],
                }),
                markerType: "static",
                category: "npc",
            },
            {
                name: "Fish Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [18, 18],
                }),
                markerType: "static",
                category: "npc",
            },
            {
                name: "Milk Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [18, 18],
                }),
                markerType: "static",
                category: "npc",
            },
            {
                name: "Wool Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [18, 18],
                }),
                markerType: "static",
                category: "npc",
            },
        ];

        const chests = [
            {
                name: "Common Chest",
                icon: L.icon({
                    iconUrl: "./icons/common-chest.svg",
                    iconSize: [28, 28],
                    iconAnchor: [14, 28],
                    popupAnchor: [0, -14],
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "chest",
            },
            {
                name: "Uncommon Chest",
                icon: L.icon({
                    iconUrl: "./icons/uncommon-chest.svg",
                    iconSize: [28, 28],
                    iconAnchor: [14, 28],
                    popupAnchor: [0, -14],
                }),
                markerType: "respawning",
                respawnTime: 7,
                category: "chest",
            },
            {
                name: "Rare Chest",
                icon: L.icon({
                    iconUrl: "./icons/rare-chest.svg",
                    iconSize: [28, 28],
                    iconAnchor: [14, 28],
                    popupAnchor: [0, -14],
                }),
                markerType: "respawning",
                respawnTime: 14,
                category: "chest",
            },
            {
                name: "Epic Chest",
                icon: L.icon({
                    iconUrl: "./icons/epic-chest.svg",
                    iconSize: [28, 28],
                    iconAnchor: [14, 28],
                    popupAnchor: [0, -14],
                }),
                markerType: "respawning",
                respawnTime: 30,
                category: "chest",
            },
            {
                name: "Legendary Chest",
                icon: L.icon({
                    iconUrl: "./icons/legendary-chest.svg",
                    iconSize: [28, 28],
                    iconAnchor: [14, 28],
                    popupAnchor: [0, -14],
                }),
                markerType: "one-time",
                category: "chest",
            },
        ];

        const collectibles = [
            {
                name: "Sheriff Badge",
                icon: L.icon({
                    iconUrl: "./icons/collect/sheriff-badge.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "one-time",
                rarity: 5,
                category: "collectible",
            },
            {
                name: "Horseshoe",
                icon: L.icon({
                    iconUrl: "./icons/collect/horseshoe.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "one-time",
                rarity: 5,
                category: "collectible",
            },
            {
                name: "Toy Unicorn",
                icon: L.icon({
                    iconUrl: "./icons/collect/toy-unicorn.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "one-time",
                rarity: 5,
                category: "collectible",
            },
            {
                name: "Bottle",
                icon: L.icon({
                    iconUrl: "./icons/collect/bottle.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "one-time",
                rarity: 5,
                category: "collectible",
            },
        ];

        const other = [
            {
                name: "Picnic Basket",
                icon: L.icon({
                    iconUrl: "./icons/resource/map-00-picnic-basket.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "other",
            },
            {
                name: "Cave Entrance",
                icon: L.icon({
                    iconUrl: "./icons/cave-entrance.svg",
                    iconSize: [28, 28],
                    iconAnchor: [14, 14],
                }),
                markerType: "static",
                category: "other",
            },
            {
                name: "Quest Item",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [18, 18],
                }),
                markerType: "one-time",
                category: "other",
            },
            {
                name: "Brazier",
                icon: L.icon({
                    iconUrl: "./icons/collect/brazier.webp",
                    iconSize: scaleIcons([64, 64], 20),
                }),
                markerType: "one-time",
                category: "other",
            },
            {
                name: "Buried Treasure",
                icon: L.icon({
                    iconUrl: "./icons/collect/buried-treasure.webp",
                    iconSize: scaleIcons([64, 64], 20),
                }),
                markerType: "static",
                category: "other",
            },
        ];

        const tack = [
            {
                name: "Wood",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-02-wood.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                markerType: "respawning",
                rarity: 2,
                respawnTime: 1,
                category: "other",
            },
            {
                name: "Leather",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-03-leather.webp",
                    iconSize: scaleIcons([64, 64], 24),
                }),
                category: "other",
                markerType: "respawning",
                rarity: 3,
            },
        ];
        return [
            { name: "chest", label: "Chests", items: chests },
            { name: "collectible", label: "Collectibles", items: collectibles },
            {
                name: "food",
                label: "Food",
                items: food,
            },
            { name: "npc", label: "NPCs", items: traders },
            { name: "other", label: "Other", items: other },
            {
                name: "resource",
                label: "Resources",
                items: resources,
            },
            { name: "tack", label: "Tack Upgrade", items: tack },
        ];
    }
};
