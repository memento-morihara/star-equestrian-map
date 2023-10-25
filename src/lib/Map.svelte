<script>
    import {setContext} from "svelte";
    import {browser} from "$app/environment";
    import AddMarker from "$lib/AddMarker.svelte";
    import {flatItems} from "$lib/utils.js";
    import {allMarkers, customRoutes, selectedMarker} from "$lib/stores.js";
    import Popup from "$lib/Popup.svelte";

    let map;
    let drawnItems;
    let featureGroups = {};
    let customFeatures;
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

            // Zoom to the location of the permalinked marker
            // There is no Leaflet marker at this point, so zoom to the
            // coordinates of the location with an ID matching the URL parameter
            // using the data from the static JSON files
            if (data.initial) {
                map.flyTo([data.initial.lat, data.initial.lng], 4);
            }

            // Add a one-off event listener for when the flyTo animation ends
            // which binds a popup containing an empty div with an ID
            // that can be targeted with the Svelte component constructor
            map.once("zoomend", function () {
                $selectedMarker = $allMarkers.find((x) => x.options.id === id);

                if ($selectedMarker) {
                    $selectedMarker.bindPopup(`<div id="init"></div>`);
                    $selectedMarker.openPopup();
                    new Popup({target: document.getElementById("init")});
                }
            });


            L.tileLayer("tiles/{z}/{x}/{y}.webp", {
                maxZoom: mapMaxZoom,
                minZoom: mapMinZoom,
                tileSize: L.point(512, 512),
                noWrap: true,
                tms: false,
            }).addTo(map);


            // Create feature groups for each item to easily hide and show them later
            for (const item of flatItems) {
                featureGroups[item] = L.featureGroup().addTo(map);
            }

            customFeatures = {
                markers: L.featureGroup(),
                routes: L.featureGroup()
            };

            if ($customRoutes) {
                let lines = $customRoutes.map(line => {
                    return L.polyline(line.geometry.coordinates, {color: "blue"})
                });

                lines.forEach(line => customFeatures.routes.addLayer(line));
                customFeatures.routes.addTo(map)
            }

            /* Set up Leaflet.Draw */
            drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);
            let drawControl = new L.Control.Draw({
                draw: {
                    polygon: false,
                    rectangle: false,
                    circlemarker: false,
                    circle: false,
                    polyline: {
                        showLength: false,
                    },
                },
                edit: {
                    featureGroup: drawnItems,
                },
            });

            // map.addControl(drawControl);
        }

        /* Leaflet.Draw event handlers */
        map.on(L.Draw.Event.CREATED, (e) => {
            // Get the type of feature that was added
            switch (e.layerType) {
                case "marker":
                    // Bind a popup to hold a form for setting properties for the new marker
                    e.layer.bindPopup('<div id="new-marker"></div>', {
                        minWidth: 250,
                    });
                    break;
                case "polyline":
                    $customRoutes = [...$customRoutes, e.layer.toGeoJSON()];
                    break;
            }
            drawnItems.addLayer(e.layer);

            // Open marker popup automatically and set its content
            if (e.layerType === "marker") {
                e.layer.openPopup();
                let popup = new AddMarker({
                    target: document.getElementById("new-marker"),
                });
                popup.$set({ marker: e.layer });
            }
        });

        return {
            destroy() {
                map.remove();
            },
        };
    }


</script>

<div id="map" use:initMap>
    {#if map}
        <slot />
    {/if}
</div>

<style>
    @import "leaflet/dist/leaflet.css";

    :global(body) {
        margin: 0;
        padding: 0;
    }

    #map {
        height: 100vh;
        width: 100vw;
    }

    :global(.leaflet-container) {
        background-color: rgba(var(--bg-surface-200) / 1) !important;
    }
</style>
