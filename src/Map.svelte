<script>
    import {createEventDispatcher, onMount, setContext} from "svelte";

    let map;
    let zoom;

    const dispatch = createEventDispatcher();


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
                condensedAttributionControl: false,
            });

            L.tileLayer('./tiles/{z}/{x}/{y}.webp', {
                minZoom: mapMinZoom, maxZoom: mapMaxZoom,
                tileSize: L.point(512, 512),
                attribution: '<a href="https://www.maptiler.com/engine/">Rendered with MapTiler Engine</a>, non-commercial use only',
                noWrap: true,
                tms: false
            }).addTo(map);
            map.fitBounds(bounds);

            L.control.condensedAttribution({
                prefix: `Images &copy; <a href="https://www.foxieventures.com">Foxie Ventures</a>`
            }).addTo(map)
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
    @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

    #map {
        height: 100vh;
        width: 100vw;
    }
</style>