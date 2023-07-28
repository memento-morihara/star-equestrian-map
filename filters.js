export function initMarkers() {
	// shownItems.get().map(m => toggleMarker(valueToMarker(m)));
	let initialMarkers = shownItems.get();
	initialMarkers.forEach(m => valueToMarker(m).forEach(toggleMarker));
}


function toggleMarkerGroup(markerGroup) {
	map.hasLayer(markerGroup) ? markerGroup.remove() : markerGroup.addTo(map);
}

function toggleMarker(marker) {
	map.hasLayer(marker) ? marker.remove() : marker.addTo(map);
}

let visibleFeatures = []

function valueToMarker(name) {
	return markers.filter(marker => marker.options.name.toLowerCase().split(" ").join("-") === name.toLowerCase());
}

checkboxes.forEach(c => {
	c.checked && visibleFeatures.push({
		name: c.value,
		group: c.getAttribute("data-feature-group")
	});
	c.addEventListener("change", function (e) {
		// TODO: refactor to use FeatureGroups for each type of item
		valueToMarker(e.target.value).forEach(marker => toggleMarker(marker));

		e.target.checked ? addItem(e.target.value) : removeItem(e.target.value);
	})
})