<script>
    import {onMount, setContext} from "svelte";

    let mapEl;
    let map;
    let oms;

    setContext("map", {
        getMap: () => map,
        getOms: () => oms
    })

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
    onMount(async () => {
        map = new L.Map(mapEl, {
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
        // Resolves itself at runtime
         oms =  new OverlappingMarkerSpiderfier(map, {
            keepSpiderfied: true,
            legColors: {
                usual: "white",
                highlighted: "red"
            }
        });

        oms.addListener('spiderfy', function () {
            map.closePopup();
        });

        L.control.condensedAttribution({
            prefix: `Images &copy; <a href="https://www.foxieventures.com">Foxie Ventures</a>`
        }).addTo(map)
    });
</script>

<div id="container">
    <div id="map" bind:this={mapEl}>
        {#if map}
            <slot />
            {/if}
    </div>
</div>

<style>
    @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

    #container {
        height: 100vh;
        margin: 0;
        padding: 0;
    }
    #map {
        height: 100%;
        width: 100%;
    }
</style>