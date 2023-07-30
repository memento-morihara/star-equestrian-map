import {
	food,
	collectibles,
	resources,
	chests,
	other
} from './markers.js';
import {locations, counts} from './locations.js';
import { shownItems, addItem, removeItem, items } from './data.js';
import {Marker} from './marker.js';
import { computed, atom } from 'nanostores';

// Future
// And don't forget to import items from data.js
// const $checkedFood = atom(shownItems.get().filter(i => items[ 0 ].includes(i)));
// const $checkedResources = atom(shownItems.get().filter(i => items[ 1 ].includes(i)));
// const $checkedChests = atom(shownItems.get().filter(i => items[ 2 ].includes(i)));
// const $checkedCollectibles = atom(shownItems.get().filter(i => items[ 3 ].includes(i)));
// const $checkedOther = atom(shownItems.get().filter(i => items[ 4 ].includes(i)));

// // Autogenerated code from MapTiler
const mapExtent = [ 0.00000000, -16384.00000000, 16384.00000000, 0.00000000 ];
const mapMinZoom = 0;
const mapMaxZoom = 4;
const mapMaxResolution = 2.00000000;
const mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
const tileExtent = [ 0.00000000, -16384.00000000, 16384.00000000, 0.00000000 ];
const crs = L.CRS.Simple;
crs.transformation = new L.Transformation(1, -tileExtent[ 0 ], -1, tileExtent[ 3 ]);
crs.scale = function (zoom) {
	return Math.pow(2, zoom) / mapMinResolution;
};
crs.zoom = function (scale) {
	return Math.log(scale * mapMinResolution) / Math.LN2;
};
export let map = new L.Map('map', {
	maxZoom: mapMaxZoom,
	minZoom: mapMinZoom,
	crs: crs,
	condensedAttributionControl: false,
});

L.tileLayer('./tiles/{z}/{x}/{y}.webp', {
	minZoom: mapMinZoom, maxZoom: mapMaxZoom,
	tileSize: L.point(512, 512),
	attribution: '<a href="https://www.maptiler.com/engine/">Rendered with MapTiler Engine</a>, non-commercial use only',
	noWrap: true,
	tms: false
}).addTo(map);
map.fitBounds([
	crs.unproject(L.point(mapExtent[ 2 ], mapExtent[ 3 ])),
	crs.unproject(L.point(mapExtent[ 0 ], mapExtent[ 1 ]))
]);
L.control.mousePosition().addTo(map)

const oms = new OverlappingMarkerSpiderfier(map, {
	keepSpiderfied: true,
	legColors: {
		usual: "white",
		highlighted: "red"
	}
});

function getCount(itemName) {
  const item = counts.find(i => itemName.includes(i.name.toLowerCase().split(" ").join("-")));
  return item && item.count
}

const itemLabels = document.querySelectorAll(' ul > li > ul > li > label');
itemLabels.forEach(i => i.lastChild.nodeValue += ` (${getCount(i.firstChild.value)})`);

let selectedMarker;

let foodFeatureGroup = L.featureGroup().addTo(map);
let resourcesFeatureGroup = L.featureGroup().addTo(map);
let chestsFeatureGroup = L.featureGroup().addTo(map);
let collectiblesFeatureGroup = L.featureGroup().addTo(map);
let otherFeatureGroup = L.featureGroup().addTo(map);


export function newMarker(loc, name, description, id) {
	const obj = [ food, resources, chests, collectibles, other ].flat().find(x => x.name === name);
	const marker = L.marker(loc, {
		name: name,
		description: description,
		id: id,
		riseOnHover: true,
		icon: (obj && obj.icon) || L.icon({
			iconUrl: './se-marker.svg',
		}),
	})
	marker.bindPopup(`<h2 class="marker-title">${name}</h2><p>${description ?? ""}`);
	oms.addMarker(marker);
	// addFeatures(marker);
	marker.on('contextmenu click', () => {
		selectedMarker = marker;
	});

	return marker;
}

// Prevent marker popup when clicking on a group of markers
oms.addListener('spiderfy', function () {
	map.closePopup();
});

let markers = [];

async function getMarkers() {
	let list = locations;
	for (let location of list) {
		let marker = newMarker([ location.lat, location.lng ], location.name, location.description, location.id);
		markers.push(marker);
	}
}

//Get the name of the objects in the arrays to compare against the marker's name
let groups = [ food, resources, chests, collectibles, other ].map(x => x.map(y => y.name));

function divideIntoGroups(marker) {
	// Find the index of the group in the groups array that contains the marker's name
	switch (groups.indexOf(groups.find(g => g.includes(marker.options.name)))) {
		case 0:
			return foodFeatureGroup;
		case 1:
			return resourcesFeatureGroup;
		case 2:
			return chestsFeatureGroup;
		case 3:
			return collectiblesFeatureGroup;
		case 4:
			return otherFeatureGroup;
	}
};


function addFeatures(marker) {
	divideIntoGroups(marker).addLayer(marker);
}
let visibleFeatures = []
let checkboxes = document.querySelectorAll("input[type=checkbox]")

map.whenReady(getMarkers)
initMarkers();
initCheckboxes();

function initMarkers() {
	let initialMarkers = shownItems.get();

	initialMarkers.forEach(item => valueToMarker(item).forEach(x => toggleMarker(x)));

	// Initialize category checkboxes
	document.querySelectorAll("input[data-feature-parent]").forEach(c => {
		isIndeterminate(c.getAttribute("data-feature-parent"));
	})
}


function toggleMarkerGroup(markerGroup) {
	map.hasLayer(markerGroup) ? markerGroup.remove() : markerGroup.addTo(map);
}

function toggleMarker(marker) {
	if (map.hasLayer(marker)) { marker.remove(); removeItem(marker.options.name.toLowerCase().split(" ").join("-")); } else { marker.addTo(map); if (!shownItems.get().includes(marker.options.name.toLowerCase().split(" ").join("-"))) { addItem(marker.options.name.toLowerCase().split(" ").join("-")); } }
}


function valueToMarker(name) {
	return markers.filter(marker => marker.options.name.toLowerCase().split(" ").join("-") === name.toLowerCase());
}


function initCheckboxes() {
	checkboxes.forEach(c => {
		if (c.getAttribute("data-feature-group")) {
			c.addEventListener("change", function (e) {
				// TODO: refactor to use FeatureGroups for each type of item
				valueToMarker(e.target.value).forEach(marker => toggleMarker(marker));

				// Parent feature group toggle becomes indeterminate if any child features are checked
				isIndeterminate(e.target.getAttribute("data-feature-group"));
			})
		} else {
			// If a parent feature group is (un)checked, all child features become (un)checked
			c.addEventListener("change", function (e) {
				for (const checkbox of checkboxes) {
					if (checkbox.getAttribute("data-feature-group") === e.target.getAttribute("data-feature-parent")) {
						checkbox.checked = e.target.checked;
					}
				}
			}
			)
		}
	})
}

function isIndeterminate(featureGroup) {
	let children = document.querySelectorAll(`input[data-feature-group="${featureGroup}"]`);
	let siblings = [];
	let parent = document.querySelector("input[data-feature-parent='" + featureGroup + "']");
	// If all children are checked, parent becomes checked
	// If at least one child but not all is checked, parent becomes indeterminate
	for (const child of children) {
		if (child.checked) {
			siblings.push(child);
		}
	}

	if (children.length === siblings.length) {
		siblings.forEach(s => valueToMarker(s.value).forEach(m => m.addTo(map)));
		parent.checked = true;
		parent.indeterminate = false;
	} else
		if (siblings.length > 0) {
			parent.indeterminate = true;
		} else if (siblings.length === 0) {
			parent.checked = false;
			parent.indeterminate = false;
		}
}

document.querySelectorAll("input[data-feature-parent]").forEach(parent => {
	parent.addEventListener("change", function () {
		checkboxes.forEach(child => {
			if (child.getAttribute('data-feature-group') === parent.getAttribute('data-feature-parent')) {
				child.checked = parent.checked;
				// If the marker is on the map but its filter is not checked, remove it, and vice versa
				valueToMarker(child.value).forEach(marker => { if (map.hasLayer(marker) !== child.checked) { toggleMarker(marker); } });
			}
		});
	})
})


L.control.condensedAttribution({
	prefix: `Images &copy; <a href="https://www.foxieventures.com">Foxie Ventures</a>`
}).addTo(map)

L.control.sidepanel('menu', {
	hasTabs: true,
}).addTo(map);

let testMarker = new Marker("123", "Common Chest", 0, 0, "A test marker.");
testMarker.mapMarker.addTo(map)