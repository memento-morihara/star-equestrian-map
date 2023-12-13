<script>
    import {setContext} from "svelte";
    import {browser} from "$app/environment";
    import {flatItems} from "$lib/utils.js";
    import {allMarkers, selectedMarker} from "./stores.js";
    import Popup from "$lib/Popup.svelte";

    let map;
    let featureGroups = {};
    let url;
    let id;

    export let data;

    setContext("map", () => map);
    setContext("groups", () => featureGroups);

    async function initMap(node) {
        if (browser) {
            url = new URL(window.location.href);
            id = url.searchParams.get("id");

            const L = await import("leaflet");
            await import("leaflet-draw");
            const mapExtent = [0.0, -16384.0, 16384.0, 0.0];
            const mapMinZoom = 0;
            const mapMaxZoom = 4;
            const mapMaxResolution = 2.0;
            const mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
            const tileExtent = [0.0, -16384.0, 16384.0, 0.0];
            const crs = L.CRS.Simple;

            crs.scale = function (zoom) {
                return Math.pow(2, zoom) / mapMinResolution;
            };
            crs.zoom = function (scale) {
                return Math.log(scale * mapMinResolution) / Math.LN2;
            };

            const bounds = [
                crs.unproject(L.point(mapExtent[2], mapExtent[3])),
                crs.unproject(L.point(mapExtent[0], mapExtent[1])),
            ];
            map = new L.Map(node, {
                minZoom: mapMinZoom,
                maxZoom: mapMaxZoom,
                crs: crs,
                attributionControl: false,
            }).fitBounds(bounds);


            if (data.initial !== null) {
                // If there is an ID in the search parameters

                map.setView([data.initial.lat, data.initial.lng], 4);

                function setPopupContent() {
                    $selectedMarker = $allMarkers.find(marker => marker.options.id === data.initial.id);
                    if ($selectedMarker) {
                        $selectedMarker.bindPopup(`<div id="${$selectedMarker.options.id}"></div>`);
                        $selectedMarker.openPopup();

                        const popup = new Popup({target: document.getElementById($selectedMarker.options.id)});
                        popup.$set({marker: $selectedMarker});

                        // Remove the handler for the initial location
                        map.once("popupopen", () => map.off("layeradd", setPopupContent));
                    }
                }

                // Whenever a marker is added, check if it is the initial location
                // When it is, open a popup
                map.on("layeradd", setPopupContent);
            } else {
                // If there is no ID in the parameters, use the default bounds
                map.fitBounds(bounds);
            }


            L.tileLayer("tiles/{z}/{x}/{y}.webp", {
                maxZoom: mapMaxZoom,
                minZoom: mapMinZoom,
                tileSize: L.point(512, 512),
                noWrap: true,
                tms: false,
            }).addTo(map);


            // Create feature groups for each item to easily hide and show them later
            for (const item of flatItems) {
                featureGroups[item] = L.featureGroup();
            }
        }

        return {
            destroy() {
                map.remove();
            },
        };
    }
</script>

<div id="map" use:initMap>
    {#if map}
        <slot/>
    {/if}
</div>
