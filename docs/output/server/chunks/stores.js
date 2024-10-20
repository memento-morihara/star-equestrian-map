import { w as writable, r as readable } from "./index.js";
import { s as setContext, o as getContext, t as get_store_value } from "./ssr.js";
const MODAL_STORE_KEY = "modalStore";
function getModalStore() {
  const modalStore = getContext(MODAL_STORE_KEY);
  if (!modalStore)
    throw new Error("modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");
  return modalStore;
}
function initializeModalStore() {
  const modalStore = modalService();
  return setContext(MODAL_STORE_KEY, modalStore);
}
function modalService() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    update,
    /** Append to end of queue. */
    trigger: (modal) => update((mStore) => {
      mStore.push(modal);
      return mStore;
    }),
    /**  Remove first item in queue. */
    close: () => update((mStore) => {
      if (mStore.length > 0)
        mStore.shift();
      return mStore;
    }),
    /** Remove all items from queue. */
    clear: () => set([])
  };
}
const stores = {};
function localStorageStore(key, initialValue, options) {
  options?.serializer ?? JSON;
  options?.storage ?? "local";
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe, set } = store;
    stores[key] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
const modeCurrent = localStorageStore("modeCurrent", false);
function setInitialClassState() {
  const elemHtmlClasses = document.documentElement.classList;
  const condLocalStorageUserPrefs = localStorage.getItem("modeUserPrefers") === "false";
  const condLocalStorageUserPrefsExists = !("modeUserPrefers" in localStorage);
  const condMatchMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (condLocalStorageUserPrefs || condLocalStorageUserPrefsExists && condMatchMedia) {
    elemHtmlClasses.add("dark");
  } else {
    elemHtmlClasses.remove("dark");
  }
}
function autoModeWatcher() {
  const mql = window.matchMedia("(prefers-color-scheme: light)");
  function setMode(value) {
    const elemHtmlClasses = document.documentElement.classList;
    const classDark = `dark`;
    value === true ? elemHtmlClasses.remove(classDark) : elemHtmlClasses.add(classDark);
  }
  setMode(mql.matches);
  mql.onchange = () => {
    setMode(mql.matches);
  };
}
function prefersReducedMotion() {
  return false;
}
const prefersReducedMotionStore = readable(prefersReducedMotion(), (set) => {
});
const categories = [
  {
    name: "chest",
    label: "Chests",
    items: [
      "common-chest",
      "uncommon-chest",
      "rare-chest",
      "epic-chest",
      "legendary-chest"
    ]
  },
  {
    name: "collectible",
    label: "Collectibles",
    items: ["bottle", "toy-unicorn", "sheriff-badge", "horseshoe", "brazier"]
  },
  {
    name: "food",
    label: "Food",
    items: [
      "apple",
      "berries",
      "brown-mushroom",
      "carrot",
      "daikon-radish",
      "grapes",
      "honey",
      "lettuce",
      "lemon",
      "orange",
      "pumpkin",
      "purple-carrot",
      "strawberries",
      "truffle",
      "turnip",
      "watermelon",
      "wheat",
      "white-mushroom",
      "zucchini"
    ]
  },
  {
    name: "npc",
    label: "NPCs",
    items: [
      "butterflies-trader",
      "eggs-trader",
      "fish-trader",
      "milk-trader",
      "wool-trader"
    ]
  },
  {
    name: "other",
    label: "Other",
    items: ["cave-entrance", "picnic-basket", "quest-item", "buried-treasure"]
  },
  {
    name: "resource",
    label: "Resources",
    items: ["butterflies", "eggs", "fish", "milk", "wool"]
  },
  { name: "tack", label: "Tack Upgrade", items: ["leather", "wood"] }
];
function slugifyName(name) {
  return name.split(" ").join("-").toLowerCase();
}
const flatNames = categories.flatMap((category) => category.name);
categories.flatMap((category) => category.items);
async function inlineSvg(path) {
  return await fetch(path).then((res) => res.blob()).then((res) => res.arrayBuffer()).then((bytes) => {
    let decoder = new TextDecoder("utf-8");
    return decoder.decode(bytes);
  });
}
const mapStore = writable();
const selectedMarker = writable(void 0);
const windowParams = writable({ width: null, height: null });
let filters = [];
categories.flatMap(
  (category) => filters = [...filters, ...category.items, category.name]
);
const filterStore = localStorageStore("filters", filters);
const defaultSettings = {
  keepOnTop: false,
  closePopups: true,
  hideCollectedMarkers: false,
  markerOpacity: 0.3,
  spiderfyMarkers: true,
  hoverMarkers: false,
  keepSpiderfied: true,
  broncoEnabled: false,
  loadImages: true
};
let initialStore = {};
const initSettings = () => {
  for (const key of Object.keys(defaultSettings)) {
    initialStore[key] = defaultSettings[key];
  }
  return initialStore;
};
const settings = localStorageStore("settings", initSettings());
const allMarkers = writable([]);
const collectibleStores = writable([]);
const points = writable(0);
const itemsCollected = writable(0);
export {
  settings as a,
  mapStore as b,
  autoModeWatcher as c,
  collectibleStores as d,
  selectedMarker as e,
  filterStore as f,
  getModalStore as g,
  allMarkers as h,
  initializeModalStore as i,
  categories as j,
  flatNames as k,
  inlineSvg as l,
  modeCurrent as m,
  slugifyName as n,
  points as o,
  prefersReducedMotionStore as p,
  itemsCollected as q,
  setInitialClassState as s,
  windowParams as w
};
