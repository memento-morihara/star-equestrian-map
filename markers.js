export const food = [
	{
		name: "Apple",
		icon: L.icon({
			iconUrl: "./icons/webp/apple.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		rarity: "Common",
		category: "food",
		stat: "Speed"
	},
	{
		name: "Berries",
		icon: L.icon({
			iconUrl: "./icons/berries.png",
			iconSize: [ 22, 22 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		rarity: "Uncommon",
		category: "food",
		stat: "Speed"
	},
	{
		name: "Brown Mushroom",
		icon: L.icon({
			iconUrl: "./icons/webp/brown-mushroom.webp",
			iconSize: [ 20, 20 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Jump",
	},
	{
		name: "Carrot",
		icon: L.icon({
			iconUrl: "./icons/webp/carrot.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Jump",
	},
	{
		name: "Honey",
		icon: L.icon({
			iconUrl: "./icons/webp/honey.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Speed",
	},
	{
		name: "Lemon",
		icon: L.icon({
			iconUrl: "./icons/webp/lemon.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Acceleration",
	},
	{
		name: "Lettuce",
		icon: L.icon({
			iconUrl: "./icons/webp/lettuce.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Agility"
	},
	{
		name: "Orange",
		icon: L.icon({
			iconUrl: "./icons/webp/orange.webp",
			iconSize: [ 16, 16 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Acceleration"
	},
	{
		name: "Pumpkin",
		icon: L.icon({
			iconUrl: "./icons/webp/pumpkin.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Acceleration"
	},
	{
		name: "Strawberries",
		icon: L.icon({
			iconUrl: "./icons/strawberry.png",
			iconSize: [ 24, 24 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Stamina"
	},
	{
		name: "Truffle",
		icon: L.icon({
			iconUrl: "./icons/truffle.png",
			iconSize: [ 22, 22 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Agility"
	},
	{
		name: "Turnip",
		icon: L.icon({
			iconUrl: "./icons/turnip.png",
			iconSize: [ 28, 28 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Agility"
	},
	{
		name: "Watermelon",
		icon: L.icon({
			iconUrl: "./icons/watermelon.png",
			iconSize: [ 20, 20 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Jump"
	},
	{
		name: "Wheat",
		icon: L.icon({
			iconUrl: "./icons/wheat.png",
			iconSize: [ 28, 28 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Stamina"
	},
	{
		name: "White Mushroom",
		icon: L.icon({
			iconUrl: "./icons/white-mushroom.png",
			iconSize: [ 20, 20 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "food",
		stat: "Stamina"
	},
]

export const resources = [
	{
		name: "Butterflies",
		icon: L.icon({
			iconUrl: "./icons/webp/butterfly.webp",
			iconSize: [ 22, 22 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "resources"
	},
	{
		name: "Eggs",
		icon: L.icon({
			iconUrl: "./icons/webp/eggs.webp",
			iconSize: [ 16, 16 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "resources"
	},
	{
		name: "Fish",
		icon: L.icon({
			iconUrl: "./icons/webp/fish.webp",
			iconSize: [ 20, 20 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "resources"
	},
	{
		name: "Milk",
		icon: L.icon({
			iconUrl: "./icons/webp/milk.webp",
			iconSize: [ 20, 20 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "resources"
	},
	{
		name: "Wool",
		icon: L.icon({
			iconUrl: "./icons/wool.png",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "resources"
	},
]

export const chests = [
	{
		name: "Common Chest",
		icon: L.icon({
			iconUrl: "./icons/common.svg",
			iconSize: [ 28, 28 ],
			iconAnchor: [ 14, 28 ],
			popupAnchor: [ 0, -14 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "chests"
	},
	{
		name: "Uncommon Chest",
		icon: L.icon({
			iconUrl: "./icons/uncommon.svg",
			iconSize: [ 28, 28 ],
			iconAnchor: [ 14, 28 ],
			popupAnchor: [ 0, -14 ]
		}),
		markerType: "respawning",
		respawnTime: 7,
		category: "chests"
	},
	{
		name: "Rare Chest",
		icon: L.icon({
			iconUrl: "./icons/rare.svg",
			iconSize: [ 28, 28 ],
			iconAnchor: [ 14, 28 ],
			popupAnchor: [ 0, -14 ]
		}),
		markerType: "respawning",
		respawnTime: 14,
		category: "chests"
	},
	{
		name: "Epic Chest",
		icon: L.icon({
			iconUrl: "./icons/epic.svg",
			iconSize: [ 28, 28 ],
			iconAnchor: [ 14, 28 ],
			popupAnchor: [ 0, -14 ]
		}),
		markerType: "respawning",
		respawnTime: 30,
		category: "chests"
	},
	{
		name: "Legendary Chest",
		icon: L.icon({
			iconUrl: "./icons/legendary.svg",
			iconSize: [ 28, 28 ],
			iconAnchor: [ 14, 28 ],
			popupAnchor: [ 0, -14 ]
		}),
		markerType: "one-time",
		category: "chests"
	},
]

export const collectibles = [
	{
		name: "Sheriff Badge",
		icon: L.icon({
			iconUrl: "./icons/webp/sheriffs-badge.webp",
			iconSize: [ 24, 24 ]
		}),
		markerType: "one-time",
		category: "collectibles"
	},
	{
		name: "Horseshoe",
		icon: L.icon({
			iconUrl: "./icons/webp/horseshoe.webp",
			iconSize: [ 18, 18 ]
		}),
		markerType: "one-time",
		category: "collectibles"
	},
	{
		name: "Toy Unicorn",
		icon: L.icon({
			iconUrl: "./icons/toy-unicorn.png",
			iconSize: [ 24, 24 ]
		}),
		markerType: "one-time",
		category: "collectibles"
	},
	{
		name: "Bottle",
		icon: L.icon({
			iconUrl: "./icons/webp/message-in-a-bottle.webp",
			iconSize: [ 18, 24 ]
		}),
		markerType: "one-time",
		category: "collectibles"
	}
]

export const other = [
	{
		name: "Picnic Basket",
		icon: L.icon({
			iconUrl: "./icons/picnic-basket.png",
			iconSize: [ 18, 18 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "other"
	},
	{
		name: "Wood",
		icon: L.icon({
			iconUrl: "./icons/wood.png",
			iconSize: [ 22, 22 ]
		}),
		markerType: "respawning",
		respawnTime: 1,
		category: "other"
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
	}
]
