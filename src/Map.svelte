<script>
    import {onMount, setContext} from "svelte";

    let map;
    let zoom;

    setContext("map", () => map);

    const mapExtent = [0.00000000, -16384.00000000, 16384.00000000, 0.00000000];
    const mapMinZoom = 0;
    const mapMaxZoom = 4;
    const mapMaxResolution = 2.00000000;
    const mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
    const tileExtent = [0.00000000, -16384.00000000, 16384.00000000, 0.00000000];
    const crs = L.CRS.Simple;


    const bounds = [
        crs.unproject(L.point(mapExtent[2], mapExtent[3])),
        crs.unproject(L.point(mapExtent[0], mapExtent[1]))
    ];

    function initMap(node) {
        onMount(() => {
            crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
            crs.scale = function (zoom) {
                return Math.pow(2, zoom) / mapMinResolution;
            };
            crs.zoom = function (scale) {
                return Math.log(scale * mapMinResolution) / Math.LN2;
            };

            map = new L.Map(node, {
                maxZoom: mapMaxZoom,
                minZoom: mapMinZoom,
                crs: crs,
                attributionControl: false, // Attribution is added as a custom Svelte component
            });

            L.tileLayer('./tiles/{z}/{x}/{y}.webp', {
                minZoom: mapMinZoom, maxZoom: mapMaxZoom,
                tileSize: L.point(512, 512),
                noWrap: true,
                tms: false
            }).addTo(map);
            map.fitBounds(bounds);
        })


        return {
            destroy() {
                map.remove();
            }
        }
    }

</script>

<div id="map" use:initMap>
    {#if map}
        <slot/>
    {/if}
</div>


<style>
    @import "leaflet/dist/leaflet.css";

    #map {
        height: 100vh;
        width: 100vw;
    }
</style>