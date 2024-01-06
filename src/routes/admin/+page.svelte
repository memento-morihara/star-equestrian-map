<script>
  import { setContext } from "svelte";
  import { browser } from "$app/environment";
  import AddMarker from "./AddMarker.svelte";
  import PocketBase from "pocketbase";
  import { markerData } from "$lib/markerData.js";
  import { PUBLIC_DB_PASSWORD, PUBLIC_DB_URL, PUBLIC_DB_USER } from "$env/static/public";

  let L;
  let map;
  let drawnItems;

  setContext("map", () => map);
  setContext("drawn", () => drawnItems);

  const data = async () => await markerData();

  const db = new PocketBase(PUBLIC_DB_URL);

  async function initMap(node) {
    if (browser) {
      const locations = await db.collection("locations_new").getFullList();
      L = await import("leaflet");
      await import("leaflet-draw");

      // This route won't make it into the built app, so just make credentials public
      // env variables so we don't need admin-specific backend code
      const auth = db.admins.authWithPassword(
        PUBLIC_DB_USER,
        PUBLIC_DB_PASSWORD
      );

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
          featureGroup: drawnItems
        }
      });

      map.addControl(drawControl);
      console.log(L);

      const dataList = await data();

      let paths = await db.collection("paths").getFullList();
      let lines = [];
      let lineFeatures = L.featureGroup(lines).addTo(drawnItems);
      paths.forEach((path) => {
        const geo = L.GeoJSON.geometryToLayer(path.geojson.geometry, {
          id: path.id
        });
        drawnItems.addLayer(geo);
        // lineFeatures.addLayer(L.polyline(geo._latlngs));
        // lines.push(L.polyline(geo._latlngs))
      });
      let markerFeatures = L.featureGroup().addTo(drawnItems);

      locations.forEach((location) => {
        const props = dataList
          .flatMap((obj) => obj.items)
          .find((obj) => obj.name === location.name);

        const marker = L.marker([location.lat, location.lng], {
          id: location.id,
          name: location.name,
          description: location.description,
          ...props
        });
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
          savePath(e.layer.toGeoJSON());
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

      Object.values(edited._layers).forEach((marker) => {
        if (marker._path) {
          savePath(marker.toGeoJSON(), marker.options.id, "paths");
        } else {
          saveLocation(
            marker.options.name,
            marker._latlng.lat,
            marker._latlng.lng,
            marker.options.description,
            marker.options.id
          );
        }
      });
    });

    map.on(L.Draw.Event.DELETED, async (e) => {
      console.log(e);
      Object.values(e.layers._layers).forEach((location) => {
        if (location._path) {
          db.collection("paths").delete(location.options.id);
        } else {
          db.collection("locations_new").delete(location.options.id);
        }
      });
    });

    return {
      destroy() {
        map.remove();
      }
    };
  }

  /**
   * Create or update a marker location in the database.
   * @async
   * @param {string} name - The name of the item.
   * @param {number} lat - The latitude of the item's location.
   * @param {number} lng - The longitude of the item's location.
   * @param {string} [description] - (optional) A description of the item's precise location if it's not immediately obvious.
   * @param {string} [id] - (optional) The 15-character string ID generated by PocketBase. It will update the record if an ID is passed in and create it if not.
   */
  async function saveLocation(name, lat, lng, description, id) {
    const body = `{"name": "${name}", "lat": ${lat}, "lng": ${lng}, "description": "${description}"}`;

    return !!id
      ? await db.collection("locations_new").update(id, body)
      : await db.collection("locations_new").create(body);
  }

  async function savePath(path, id = null, collection) {
    if (id) {
      await db
        .collection(collection)
        .update(id, { geojson: JSON.stringify(path) });
    } else {
      await db.collection(collection).create({ geojson: JSON.stringify(path) });
    }
  }
</script>

<svelte:head>
  <!--    <script src="https://unpkg.com/@turf/turf@latest"></script>-->
</svelte:head>

<div id="map" use:initMap>
  {#if map}
    <slot />
  {/if}
</div>
-->

<style>
    @import "leaflet-draw/dist/leaflet.draw.css";
</style>
