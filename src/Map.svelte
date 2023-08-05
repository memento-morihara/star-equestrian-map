<script>
    import L from "leaflet";
    import {onDestroy, onMount} from "svelte";
    import Sidepanel from "./Sidepanel.svelte";
    import {items, shownFilters, selectedMarker} from "./stores.js"
    import {locations, counts} from "../locations.js";
    import {Marker} from "../marker.js";
    import Popup from "./Popup.svelte";

    let mapEl;
    let map;

    let markers = [];


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
        // const oms = new OverlappingMarkerSpiderfier(map, {
        //     keepSpiderfied: true,
        //     legColors: {
        //         usual: "black",
        //         highlighted: "red"
        //     }
        // });


        await initMarkers().then((markers) => {
            markers.forEach(marker => {
                if ($shownFilters.includes(marker.options.name.toLowerCase().split(" ").join("-"))) {
                    marker.addTo(map)

                }

            })
        })
    });

    onDestroy(() => localStorage.setItem("shownItems", $shownFilters))

    function formatName(name) {
        if (name.includes("-") || name.toLowerCase() === name)
        {
        return name.split("-").map(word => [word[0].toUpperCase(), word.slice(1)].join('')).join(" ")
        } else {
            return name.toLowerCase().split(" ").join("-");
        }
    }

    async function getMarkers() {
        for (let location of locations) {
            let marker = newMarker(location.id, location.name, location.lat, location.lng, location.description);
            markers.push(marker);
        }
    }

    function newMarker(id, name, lat, lng, description) {
        const obj = new Marker(id, name, lat, lng, description);
        const marker = obj.mapMarker;
        if (obj.lastCollectedDate) {
            marker.setOpacity(0.5)
        }
        // oms.addMarker(marker);
        // addFeatures(marker);
        marker.on('contextmenu click', () => {
            $selectedMarker = marker;
            document.querySelector("#collect")?.addEventListener("click", () => obj.collect())
            document.querySelector("#no-respawn")?.addEventListener("click", () => obj.noSpawn())
        });

        return marker;
    }


    function handleFilterChange(e) {
        $shownFilters = e.detail.selection.filter(i => !["chests", "food", "resources", "collectibles", "other"].includes(i.dataset.value)).map(x => x.dataset.value);
        localStorage.setItem("shownItems", $shownFilters)
    }

    $: {
        // Whenever shownFilters updates, remove all the markers and add back those from shownFilters
        markers.forEach(marker => marker.remove())
        $shownFilters.forEach(item => valueToMarker(item).forEach(marker => marker.addTo(map)))
        $shownFilters.forEach(item => {
            // valueToMarker(item).forEach(x => x.addTo(map));
            document.querySelectorAll("sl-tree-item[data-value]").forEach(c => {
                if (c.getAttribute("data-value") === item) {
                    c.setAttribute("selected", "true");
                }
            })
        });
    }

    function valueToMarker(name){
        return markers.filter(marker => marker.options.name === formatName(name));

    }

    async function initMarkers() {
        await getMarkers();
        $shownFilters.forEach(item => {
            // valueToMarker(item).forEach(x => x.addTo(map));
            document.querySelectorAll("sl-tree-item[data-value]").forEach(c => {
                if (c.getAttribute("data-value") === item) {
                    c.setAttribute("selected", "true");
                }
            })
        });
        return markers;
    }

</script>
<svelte:options immutable />
<div id="container">
    <div id="map" bind:this={mapEl}></div>
    <Sidepanel panelPosition="left" darkMode={false} tabs={["Filter", "Progress", "Settings"]}>
        <svelte:fragment slot="slot-1">
            <sl-tree selection="multiple" on:sl-selection-change={e => handleFilterChange(e)}>
                {#each items as item}
                    <sl-tree-item data-value="{item.parent.toLowerCase()}">
                        <span class="parent">{item.parent}</span>
                        {#each item.children as child}
                            <sl-tree-item data-value="{child}" class="child">{formatName(child)} ({counts.find(c => c.name === formatName(child)).count})</sl-tree-item>
                        {/each}
                    </sl-tree-item>
                {/each}
            </sl-tree>
        </svelte:fragment>

        <div slot="slot-2">
            More Content
        </div>

        <div slot="slot-3">
            <sl-checkbox>Hide collected</sl-checkbox>
        </div>
    </Sidepanel>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier-Leaflet/0.2.6/oms.min.js"></script>
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

    sl-tree {
        margin-top: 1em;
        font-size: 1.2em;
    }

    .parent {
        font-size: 1.2em;
        font-weight: 500;
        line-height: 2em;
    }

    .child {
        margin-left: 0.25em;
        line-height: 1.5em;
    }

    /* Hide selected item highlight for Shoelace tree items */
    ::part(item--selected) {
        background-color: transparent;
        border-inline-start-color: transparent;
    }
</style>