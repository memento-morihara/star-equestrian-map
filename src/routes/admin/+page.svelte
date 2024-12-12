<script>
  import { setContext } from "svelte";
  import { browser } from "$app/environment";
  import AddMarker from "./AddMarker.svelte";
  import { markerData } from "$lib/markerData.js";
  import { page } from "$app/stores";

  let L;
  let map;
  let drawnItems;

  setContext("map", () => map);
  setContext("drawn", () => drawnItems);

  const data = async () => await markerData();
  const pageData = JSON.parse($page.data.data);
  const locations = [...pageData.locations, ...pageData.broncoLocations];

  async function initMap(node) {
    if (browser) {
      L = await import("leaflet");
      await Promise.resolve(L).then(() => import("leaflet-draw"));


      const mapExtent = [0.0, -16384.0, 16384.0, 0.0];
      const mapMinZoom = 0;
      const mapMaxZoom = 4;
      const mapMaxResolution = 2.0;
      const mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
      const tileExtent = [0.0, -16384.0, 16384.0, 0.0];
      const crs = L.CRS.Simple;

      crs.scale = function(zoom) {
        return Math.pow(2, zoom) / mapMinResolution;
      };
      crs.zoom = function(scale) {
        return Math.log(scale * mapMinResolution) / Math.LN2;
      };

      const bounds = [
        crs.unproject(L.point(mapExtent[2], mapExtent[3])),
        crs.unproject(L.point(mapExtent[0], mapExtent[1]))
      ];

      map = new L.Map(node, {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        crs: crs,
        attributionControl: false
      }).fitBounds(bounds);

      L.tileLayer("tiles/{z}/{x}/{y}.webp", {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        tileSize: L.point(512, 512),
        noWrap: true,
        tms: false
      }).addTo(map);

      // If L.Draw doesn't exist, grab it from window
      if (!L.Draw) {
        L.Draw = window.L.Draw;
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
            showLength: false
          }
        },
        edit: {
          featureGroup: drawnItems,
          remove: true
        }
      });

      map.addControl(drawControl);

      const dataList = await data();

      // let paths = []; //await db.collection("paths").getFullList();
      // let lines = [];
      // let lineFeatures = L.featureGroup(lines).addTo(drawnItems);
      // paths.forEach((path) => {
      //   const geo = L.GeoJSON.geometryToLayer(path.geojson.geometry, {
      //     id: path.id
      //   });
      //   drawnItems.addLayer(geo);
      //   // lineFeatures.addLayer(L.polyline(geo._latlngs));
      //   // lines.push(L.polyline(geo._latlngs))
      // });
      let markerFeatures = L.featureGroup().addTo(map);

      locations.forEach((location) => {
        const props = dataList
          .flatMap((obj) => obj.items)
          .find((obj) => obj.name === location.name);

        const marker = L.marker([location.lat, location.lng], {
          id: location.id,
          name: location.name,
          description: location.description,
          region: location.region,
          ...props
        });
        drawnItems.addLayer(marker);
        markerFeatures.addLayer(marker);
        marker.bindPopup(`<div id=${marker.options.id}></div>`, {
          minWidth: 240
        });
        marker.on("popupopen", () => {
          let popup = new AddMarker({
            target: document.getElementById(marker.options.id)
          });
          popup.$set({ marker: marker });
        });
      });
    }

    console.log(drawnItems);

    /* Leaflet.Draw event handlers */
    map.on(L.Draw.Event.CREATED, (e) => {
      console.log(e);
      // Get the type of feature that was added
      switch (e.layerType) {
        case "marker":
          // Bind a popup to hold a form for setting properties for the new marker
          e.layer.bindPopup("<div id=\"new-marker\" class=\"w-[400px]\"></div>", {
            minWidth: 400
          });
          break;
        case "polyline":
          // savePath(e.layer.toGeoJSON());
          break;
        // case "polygon":
        //     console.log(e.layer);
        //     break;
      }

      drawnItems.addLayer(e.layer);

      // Open marker popup automatically and set its content
      if (e.layerType === "marker") {
        e.layer.openPopup();
        let popup = new AddMarker({
          target: document.getElementById("new-marker")
        });
        popup.$set({ marker: e.layer });
      }
    });

    map.on(L.Draw.Event.EDITED, (e) => {
      const edited = e.layers;

      edited.eachLayer(async (item) => {
        await fetch("/admin/api/marker", {
          method: "POST",
          body: JSON.stringify({
            id: item.options.id,
            name: item.options.name,
            lat: item._latlng.lat,
            lng: item._latlng.lng,
            description: item.options.description,
            region: item.region
          })
        });
      });


      // Object.values(edited._layers).forEach((marker) => {
      //   if (marker._path) {
      //     savePath(marker.toGeoJSON(), marker.options.id, "paths");
      //   } else {
      //     saveLocation(
      //       marker.options.name,
      //       marker._latlng.lat,
      //       marker._latlng.lng,
      //       marker.options.description,
      //       marker.options.id
      //     );
      //   }
      // });
    });

    map.on(L.Draw.Event.DELETED, async (e) => {
      console.log(e);
      Object.values(e.layers._layers).forEach((location) => {
        if (location._path) {
          // db.collection("paths").delete(location.options.id);
        } else {
          // db.collection("locations_new").delete(location.options.id);
        }
      });
    });

    return {
      destroy() {
        map.remove();
      }
    };
  }
</script>

<div id="map" use:initMap>
  {#if map}
    <slot />
  {/if}
</div>
-->

<style>
    @import "../../../node_modules/leaflet-draw/dist/leaflet.draw.css";
</style>
