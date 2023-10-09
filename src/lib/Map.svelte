<script>
    import { onMount, setContext } from "svelte";
    import { browser } from "$app/environment";
    import { selectedMarker } from "./stores.js";

    let map;
    let mapEl;
    export let initialLocation;

    setContext("map", () => map);
    function initMap(node) {
        onMount(async () => {
            if (browser) {
                const L = await import("leaflet");
                const mapExtent = [0.0, -16384.0, 16384.0, 0.0];
                const mapMinZoom = 0;
                const mapMaxZoom = 4;
                const mapMaxResolution = 2.0;
                const mapMinResolution =
                    Math.pow(2, mapMaxZoom) * mapMaxResolution;
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
                });

                L.tileLayer("tiles/{z}/{x}/{y}.webp", {
                    maxZoom: mapMaxZoom,
                    minZoom: mapMinZoom,
                    tileSize: L.point(512, 512),
                    noWrap: true,
                    tms: false,
                }).addTo(map);
                map.fitBounds(bounds);

                map.on("dblclick", (e) => {
                    L.popup(e.latlng, { content: `${e.latlng}` }).addTo(map);
                });

                if (initialLocation) {
                    map.whenReady(() => {
                        map.setView(initialLocation, 5);
                    });
                }
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
</style>
