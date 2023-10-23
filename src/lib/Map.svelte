<script>
    import { onDestroy, onMount, setContext } from "svelte";
    import { browser } from "$app/environment";
    import AddMarker from "$lib/AddMarker.svelte";
    import { categories } from "$lib/utils.js";
    import { allMarkers, selectedMarker, searchParams, customMarkers, customRoutes } from "$lib/stores.js";
    import PopupContent from "$lib/PopupContent.svelte";

    let map;
    let drawnItems;
    let featureGroups = {};
    let customFeatures;
    let url;
    let id;

    $: initialLocation = $allMarkers.find((x) => x.options.id === id);

    setContext("map", () => map);
    setContext("groups", () => featureGroups);

    async function initMap(node) {
        // onMount(async () => {
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

            L.tileLayer("tiles/{z}/{x}/{y}.webp", {
                maxZoom: mapMaxZoom,
                minZoom: mapMinZoom,
                tileSize: L.point(512, 512),
                noWrap: true,
                tms: false,
            }).addTo(map);

            if (initialLocation) {
                $searchParams = $allMarkers.find((x) => x.options.id === id);
                $selectedMarker = $searchParams;
                map.setView($searchParams._latlng, 4);
                $selectedMarker.openPopup()
            }

            // Create feature groups for each item to easily hide and show them later
            for (const item of categories.flatMap(
                (category) => category.items
            )) {
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

            map.addControl(drawControl);
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
