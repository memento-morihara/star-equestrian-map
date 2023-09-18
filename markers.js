// Calculate height and width of icons based on the existing values
// They vary a lot in terms of the visual space they occupy
// so the target size is determined case-by-case
const scaleIcons = (dimensions, targetSize) => {
  const scale =
    dimensions[0] > dimensions[1]
      ? targetSize / dimensions[0]
      : targetSize / dimensions[1];
  return [scale * dimensions[0], scale * dimensions[1]];
};

export const food = [
  {
    name: "Apple",
    icon: L.icon({
      iconUrl: "./icons/apple.webp",
      iconSize: scaleIcons([29, 32], 20),
    }),
    markerType: "respawning",
    respawnTime: 1,
    rarity: "Common",
    category: "food",
    stat: "Speed",
  },
  {
    name: "Berries",
    icon: L.icon({
      iconUrl: "./icons/berries.webp",
      iconSize: scaleIcons([32, 31], 22),
      popupAnchor: [-1, 10],
    }),
    markerType: "respawning",
    respawnTime: 1,
    rarity: "Uncommon",
    category: "food",
    stat: "Speed",
  },
  {
    name: "Brown Mushroom",
    icon: L.icon({
      iconUrl: "./icons/brown-mushroom.webp",
      iconSize: scaleIcons([29, 32], 20),
      popupAnchor: [-2, 10],
    }),
    markerType: "respawning",
    respawnTime: 1,
    rarity: "Rare",
    category: "food",
    stat: "Jump",
  },
  {
    name: "Carrot",
    icon: L.icon({
      iconUrl: "./icons/carrot.webp",
      iconSize: scaleIcons([32, 31], 22),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Jump",
  },
  {
    name: "Daikon Radish",
    icon: L.icon({
      iconUrl: "./icons/daikon-radish.webp",
      iconSize: scaleIcons([32, 31], 24),
    }),
    category: "food",
    markerType: "respawning",
    stat: "Agility",
  },
  {
    name: "Grapes",
    icon: L.icon({
      iconUrl: "./icons/grapes.webp",
      iconSize: scaleIcons([32, 32], 22),
    }),
    category: "food",
    markerType: "respawning",
    stat: "Stamina",
  },
  {
    name: "Honey",
    icon: L.icon({
      iconUrl: "./icons/honey.webp",
      iconSize: scaleIcons([31, 32], 18),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Speed",
  },
  {
    name: "Lemon",
    icon: L.icon({
      iconUrl: "./icons/lemon.webp",
      iconSize: scaleIcons([32, 30], 18),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Acceleration",
  },
  {
    name: "Lettuce",
    icon: L.icon({
      iconUrl: "./icons/lettuce.webp",
      iconSize: scaleIcons([32, 29], 18),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Agility",
  },
  {
    name: "Orange",
    icon: L.icon({
      iconUrl: "./icons/orange.webp",
      iconSize: scaleIcons([32, 32], 18),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Acceleration",
  },
  {
    name: "Pumpkin",
    icon: L.icon({
      iconUrl: "./icons/pumpkin.webp",
      iconSize: scaleIcons([32, 31], 18),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Acceleration",
  },
  {
    name: "Purple Carrot",
    icon: L.icon({
      iconUrl: "./icons/purple-carrot.webp",
      iconSize: scaleIcons([32, 31], 18),
    }),
    category: "food",
    markerType: "respawning",
    stat: "Jump",
  },
  {
    name: "Strawberries",
    icon: L.icon({
      iconUrl: "./icons/strawberry.webp",
      iconSize: scaleIcons([32, 31], 24),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Stamina",
  },
  {
    name: "Truffle",
    icon: L.icon({
      iconUrl: "./icons/truffle.webp",
      iconSize: scaleIcons([32, 32], 22),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Agility",
  },
  {
    name: "Turnip",
    icon: L.icon({
      iconUrl: "./icons/turnip.webp",
      iconSize: scaleIcons([32, 30], 28),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Agility",
  },
  {
    name: "Watermelon",
    icon: L.icon({
      iconUrl: "./icons/watermelon.webp",
      iconSize: scaleIcons([32, 31], 20),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Jump",
  },
  {
    name: "Wheat",
    icon: L.icon({
      iconUrl: "./icons/wheat.webp",
      iconSize: scaleIcons([32, 30], 28),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Stamina",
  },
  {
    name: "White Mushroom",
    icon: L.icon({
      iconUrl: "./icons/white-mushroom.webp",
      iconSize: scaleIcons([30, 32], 20),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "food",
    stat: "Stamina",
  },
  {
    name: "Zucchini",
    icon: L.icon({
      iconUrl: "./icons/zucchini.webp",
      iconSize: scaleIcons([32, 26], 22),
    }),
    category: "food",
    markerType: "respawning",
    stat: "Acceleration",
  },
];

export const resources = [
  {
    name: "Butterflies",
    icon: L.icon({
      iconUrl: "./icons/butterfly.webp",
      iconSize: scaleIcons([29, 32], 22),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "resources",
  },
  {
    name: "Eggs",
    icon: L.icon({
      iconUrl: "./icons/eggs.webp",
      iconSize: scaleIcons([32, 30], 16),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "resources",
  },
  {
    name: "Fish",
    icon: L.icon({
      iconUrl: "./icons/fish.webp",
      iconSize: scaleIcons([32, 31], 20),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "resources",
  },
  {
    name: "Milk",
    icon: L.icon({
      iconUrl: "./icons/milk.webp",
      iconSize: scaleIcons([30, 32], 20),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "resources",
  },
  {
    name: "Wool",
    icon: L.icon({
      iconUrl: "./icons/wool.webp",
      iconSize: scaleIcons([32, 31], 18),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "resources",
  },
];

export const traders = [
  {
    name: "Butterflies Trader",
    icon: new L.Icon({
      iconUrl: "./icons/quest-icon.svg",
      iconSize: [18, 18],
    }),
    markerType: "static",
    category: "traders",
  },
  {
    name: "Eggs Trader",
    icon: L.icon({
      iconUrl: "./icons/quest-icon.svg",
      iconSize: [18, 18],
    }),
    markerType: "static",
    category: "traders",
  },
  {
    name: "Fish Trader",
    icon: L.icon({
      iconUrl: "./icons/quest-icon.svg",

      iconSize: [18, 18],
    }),
    markerType: "static",
    category: "traders",
  },
  {
    name: "Milk Trader",
    icon: L.icon({
      iconUrl: "./icons/quest-icon.svg",
      iconSize: [18, 18],
    }),
    markerType: "static",
    category: "traders",
  },
  {
    name: "Wool Trader",
    icon: L.icon({
      iconUrl: "./icons/quest-icon.svg",
      iconSize: [18, 18],
    }),
    markerType: "static",
    category: "traders",
  },
];

export const chests = [
  {
    name: "Common Chest",
    icon: L.icon({
      iconUrl: "./icons/common.svg",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -14],
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "chests",
  },
  {
    name: "Uncommon Chest",
    icon: L.icon({
      iconUrl: "./icons/uncommon.svg",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -14],
    }),
    markerType: "respawning",
    respawnTime: 7,
    category: "chests",
  },
  {
    name: "Rare Chest",
    icon: L.icon({
      iconUrl: "./icons/rare.svg",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -14],
    }),
    markerType: "respawning",
    respawnTime: 14,
    category: "chests",
  },
  {
    name: "Epic Chest",
    icon: L.icon({
      iconUrl: "./icons/epic.svg",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -14],
    }),
    markerType: "respawning",
    respawnTime: 30,
    category: "chests",
  },
  {
    name: "Legendary Chest",
    icon: L.icon({
      iconUrl: "./icons/legendary.svg",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -14],
    }),
    markerType: "one-time",
    category: "chests",
  },
];

export const collectibles = [
  {
    name: "Sheriff Badge",
    icon: L.icon({
      iconUrl: "./icons/sheriff-badge.webp",
      iconSize: scaleIcons([32, 28], 24),
    }),
    markerType: "one-time",
    category: "collectibles",
  },
  {
    name: "Horseshoe",
    icon: L.icon({
      iconUrl: "./icons/horseshoe.webp",
      iconSize: scaleIcons([30, 32], 18),
    }),
    markerType: "one-time",
    category: "collectibles",
  },
  {
    name: "Toy Unicorn",
    icon: L.icon({
      iconUrl: "./icons/toy-unicorn.webp",
      iconSize: scaleIcons([27, 32], 24),
    }),
    markerType: "one-time",
    category: "collectibles",
  },
  {
    name: "Bottle",
    icon: L.icon({
      iconUrl: "./icons/bottle.webp",
      iconSize: scaleIcons([25, 32], 22),
    }),
    markerType: "one-time",
    category: "collectibles",
  },
];

export const other = [
  {
    name: "Picnic Basket",
    icon: L.icon({
      iconUrl: "./icons/picnic-basket.webp",
      iconSize: scaleIcons([32, 27], 22),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "other",
  },
  {
    name: "Wood",
    icon: L.icon({
      iconUrl: "./icons/wood.webp",
      iconSize: scaleIcons([32, 32], 22),
    }),
    markerType: "respawning",
    respawnTime: 1,
    category: "other",
  },
  {
    name: "Leather",
    icon: L.icon({
      iconUrl: "./icons/leather.webp",
      iconSize: scaleIcons([32, 30], 20),
    }),
    category: "other",
    markerType: "respawning",
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
      iconUrl: "./icons/brazier.svg",
      iconSize: [18, 18],
    }),
    markerType: "one-time",
    category: "other",
  },
];
