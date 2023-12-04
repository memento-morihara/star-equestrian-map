<script>
    import {setContext} from "svelte";
    import {browser} from "$app/environment";
    import {flatItems} from "$lib/utils.js";
    import {allMarkers, selectedMarker} from "$lib/stores.js";
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
