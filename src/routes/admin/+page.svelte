<script>
    import {setContext} from "svelte";
    import {browser} from "$app/environment";
    import AddMarker from "$lib/AddMarker.svelte";
    import PocketBase from "pocketbase";
    import {markerData} from "$lib/markerData.js";
    import {PUBLIC_DB_URL} from "$env/static/public";

    const db = new PocketBase(PUBLIC_DB_URL);

    let map;
    let drawnItems;

    setContext("map", () => map);
    setContext("drawn", () => drawnItems);

    const data = async () => await markerData();

    async function initMap(node) {
        if (browser) {

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

            const locations = await db.collection("locations_new").getFullList();
            const dataList = await data();

            const paths = await db.collection("paths").getFullList();
            paths.forEach(path => {
                const geo = L.GeoJSON.geometryToLayer(path.geojson.geometry, {id: path.id});
                drawnItems.addLayer(geo);
            });

            locations.forEach(location => {
                const props = dataList
                    .flatMap((obj) => obj.items)
                    .find((obj) => obj.name === location.name)

                const marker = L.marker([location.lat, location.lng], {
                    id: location.id,
                    name: location.name,
                    description: location.description,
                    ...props
                });
                drawnItems.addLayer(marker);
                marker.bindPopup(`<div id=${marker.options.id}></div>`,
                    {minWidth: 150});
                marker.on("popupopen", () => {
                    let popup = new AddMarker({
                        target: document.getElementById(marker.options.id),
                    });
                    popup.$set({marker: marker})
                })
            });
        }

        /* Leaflet.Draw event handlers */
        map.on(L.Draw.Event.CREATED, (e) => {
            // Get the type of feature that was added
            switch (e.layerType) {
                case "marker":
                    // Bind a popup to hold a form for setting properties for the new marker
                    e.layer.bindPopup('<div id="new-marker"></div>', {
                        minWidth: 250,
                        maxWidth: 320,
                    });
                    break;
                case "polyline":
                    savePath(e.layer.toGeoJSON());
                    break;
            }
            drawnItems.addLayer(e.layer);

            // Open marker popup automatically and set its content
            if (e.layerType === "marker") {
                e.layer.openPopup();
                let popup = new AddMarker({
                    target: document.getElementById("new-marker"),
                });
                popup.$set({marker: e.layer});
            }
        });

        map.on(L.Draw.Event.EDITED, (e) => {
            const edited = e.layers;

            Object.values(edited._layers).forEach(marker => {
                if (marker._path) {
                    savePath(marker.toGeoJSON(), marker.options.id);
                } else {
                    saveLocation(marker.options.name, marker._latlng.lat, marker._latlng.lng, marker.options.description, marker.options.id)
                }
            })
        });

        map.on(L.Draw.Event.DELETED, async (e) => {
            console.log(e)
            Object.values(e.layers._layers).forEach(location => {
                if (location._path) {
                    db.collection("paths").delete(location.options.id);
                } else {
                    db.collection("locations_new").delete(location.options.id)
                }
            });
        });

        return {
            destroy() {
                map.remove();
            },
        };
    }

    export async function saveLocation(name, lat, lng, description, id = null) {
        const body = `{"name": "${name}", "lat": ${lat}, "lng": ${lng}, "description": "${description}"}`;

        let url = PUBLIC_DB_URL + "/" + id;

        let options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: body
        };

        fetch(url, options)
            .then(res => res.json())
            .catch(err => console.error('error:' + err));
    }

    async function savePath(path, id = null) {
        if (id) {
            await db.collection("paths").update(id, {'geojson': JSON.stringify(path)});
        } else {
            await db.collection("paths").create({'geojson': JSON.stringify(path)});
        }
    }
</script>

<div id="map" use:initMap>
    {#if map}
        <slot/>
    {/if}
</div>

<style>
    @import "../../../node_modules/leaflet-draw/dist/leaflet.draw.css";
</style>