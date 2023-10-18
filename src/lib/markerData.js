import { browser } from "$app/environment";

export const markerData = async () => {
    if (browser) {
        const L = await import("leaflet");

        const scaleIcons = (dimensions, targetSize) => {
            const scale = dimensions[ 0 ] > dimensions[ 1 ] ? targetSize / dimensions[ 0 ] : targetSize / dimensions[ 1 ];
            return [ scale * dimensions[ 0 ], scale * dimensions[ 1 ] ];
        }

        const food = [
            {
                name: "Apple",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-apple.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                rarity: "Common",
                category: "food",
                stat: "speed"
            },
            {
                name: "Berries",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-blueberry.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                rarity: "Uncommon",
                category: "food",
                stat: "speed"
            },
            {
                name: "Brown Mushroom",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-mush-brown.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                rarity: "Rare",
                category: "food",
                stat: "jump",
            },
            {
                name: "Carrot",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-carrot.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "jump",
            },
            {
                name: "Daikon Radish",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-daikon.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                category: "food",
                markerType: "respawning",
                stat: "agility"
            },
            {
                name: "Grapes",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-grapes.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                category: "food",
                markerType: "respawning",
                stat: "stamina"
            },
            {
                name: "Honey",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-honey.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "speed",
            },
            {
                name: "Lemon",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-lemon.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "acceleration",
            },
            {
                name: "Lettuce",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-lettuce.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "agility"
            },
            {
                name: "Orange",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-orange.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "acceleration"
            },
            {
                name: "Pumpkin",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-pumpkin.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "acceleration"
            },
            {
                name: "Purple Carrot",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-carrot-purple.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                category: "food",
                markerType: "respawning",
                stat: "jump"
            },
            {
                name: "Strawberries",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-strawberry.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "stamina"
            },
            {
                name: "Truffle",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-truffle.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "agility"
            },
            {
                name: "Turnip",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-turnip.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "agility"
            },
            {
                name: "Watermelon",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-02-watermelon.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "jump"
            },
            {
                name: "Wheat",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-01-wheat.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "stamina"
            },
            {
                name: "White Mushroom",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-03-mush-white.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "food",
                stat: "stamina"
            },
            {
                name: "Zucchini",
                icon: L.icon({
                    iconUrl: "./icons/food/resource-04-zucchini.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                category: "food",
                markerType: "respawning",
                stat: "acceleration"
            },
        ]

        const resources = [
            {
                name: "Butterflies",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-butterfly.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "resources"
            },
            {
                name: "Eggs",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-egg.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "resources"
            },
            {
                name: "Fish",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-fish.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "resources"
            },
            {
                name: "Milk",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-milk.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "resources"
            },
            {
                name: "Wool",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-01-wool.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "resources"
            },
        ]

        const traders = [
            {
                name: "Butterflies Trader",
                icon: new L.Icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [ 18, 18 ],
                }),
                markerType: "static",
                category: "traders"
            },
            {
                name: "Eggs Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [ 18, 18 ],
                }),
                markerType: "static",
                category: "traders"
            },
            {
                name: "Fish Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [ 18, 18 ],
                }),
                markerType: "static",
                category: "traders"
            },
            {
                name: "Milk Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [ 18, 18 ],
                }),
                markerType: "static",
                category: "traders"
            },
            {
                name: "Wool Trader",
                icon: L.icon({
                    iconUrl: "./icons/quest-icon.svg",
                    iconSize: [ 18, 18 ],
                }),
                markerType: "static",
                category: "traders"
            }
        ]

        const chests = [
            {
                name: "Common Chest",
                icon: L.icon({
                    iconUrl: "./icons/common-chest.svg",
                    iconSize: [ 28, 28 ],
                    iconAnchor: [ 14, 28 ],
                    popupAnchor: [ 0, -14 ],
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "chests"
            },
            {
                name: "Uncommon Chest",
                icon: L.icon({
                    iconUrl: "./icons/uncommon-chest.svg",
                    iconSize: [ 28, 28 ],
                    iconAnchor: [ 14, 28 ],
                    popupAnchor: [ 0, -14 ],
                }),
                markerType: "respawning",
                respawnTime: 7,
                category: "chests"
            },
            {
                name: "Rare Chest",
                icon: L.icon({
                    iconUrl: "./icons/rare-chest.svg",
                    iconSize: [ 28, 28 ],
                    iconAnchor: [ 14, 28 ],
                    popupAnchor: [ 0, -14 ],
                }),
                markerType: "respawning",
                respawnTime: 14,
                category: "chests"
            },
            {
                name: "Epic Chest",
                icon: L.icon({
                    iconUrl: "./icons/epic-chest.svg",
                    iconSize: [ 28, 28 ],
                    iconAnchor: [ 14, 28 ],
                    popupAnchor: [ 0, -14 ],
                }),
                markerType: "respawning",
                respawnTime: 30,
                category: "chests"
            },
            {
                name: "Legendary Chest",
                icon: L.icon({
                    iconUrl: "./icons/legendary-chest.svg",
                    iconSize: [ 28, 28 ],
                    iconAnchor: [ 14, 28 ],
                    popupAnchor: [ 0, -14 ],
                }),
                markerType: "one-time",
                category: "chests"
            },
        ]

        const collectibles = [
            {
                name: "Sheriff Badge",
                icon: L.icon({
                    iconUrl: "./icons/collect/collect-sheriff-badge.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "one-time",
                category: "collectibles"
            },
            {
                name: "Horseshoe",
                icon: L.icon({
                    iconUrl: "./icons/collect/collect-golden-horseshoe.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "one-time",
                category: "collectibles"
            },
            {
                name: "Toy Unicorn",
                icon: L.icon({
                    iconUrl: "./icons/collect/collect-unicorn.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "one-time",
                category: "collectibles"
            },
            {
                name: "Bottle",
                icon: L.icon({
                    iconUrl: "./icons/collect/collect-message-bottle.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "one-time",
                category: "collectibles"
            }
        ]

        const other = [
            {
                name: "Picnic Basket",
                icon: L.icon({
                    iconUrl: "./icons/resource/map-00-picnic-basket.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "other"
            },
            {
                name: "Wood",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-02-wood.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                markerType: "respawning",
                respawnTime: 1,
                category: "other"
            },
            {
                name: "Leather",
                icon: L.icon({
                    iconUrl: "./icons/resource/material-03-leather.webp",
                    iconSize: scaleIcons([ 64, 64 ], 24),
                }),
                category: "other",
                markerType: "respawning",
            },
            {
                name: "Cave Entrance",
                icon: L.icon({
                    iconUrl: './icons/cave-entrance.svg',
                    iconSize: [ 28, 28 ],
                    iconAnchor: [ 14, 14 ],
                }),
                markerType: "static",
                category: "other"
            },
            {
                name: "Quest Item",
                icon: L.icon(
                    {
                        iconUrl: "./icons/quest-icon.svg",
                        iconSize: [ 18, 18 ],
                    }
                ),
                markerType: "one-time",
                category: "other"
            },
            {
                name: "Brazier",
                icon: L.icon({
                    iconUrl: "./icons/brazier.svg",
                    iconSize: scaleIcons([ 64, 64 ], 20),
                }),
                markerType: "one-time",
                category: "other"
            }
        ]
        return [
            {
                name: "Food",
                items: food
            },
            {
                name: "Resources",
                items: resources,
            },
            { name: "Traders", items: traders },
            { name: "Collectibles", items: collectibles },
            { name: "Chests", items: chests },
            { name: "Other", items: other },
        ]
    }
}
