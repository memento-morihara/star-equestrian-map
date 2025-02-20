/// <reference types="@sveltejs/kit" />
import { build, files, version } from "$service-worker";

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
  ...build, // the app itself
  ...files  // everything in `static`
];

self.addEventListener("install", (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }

  event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
  // ignore POST requests etc
  if (event.request.method !== "GET") return;

  async function respond() {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE);

    // Cloudflare Pages won't do range requests,
    // so service worker handles all tile requests
    // regardless of connectivity status
    // https://thomasgauvin.com/writing/static-protomaps-on-cloudflare/
    if (url.pathname === "/tiles.pmtiles") {
      return await handleRangeRequest(event.request);
    }

    // `build`/`files` can always be served from the cache
    if (ASSETS.includes(url.pathname)) {
      const response = await cache.match(url.pathname);

      if (response) {
        return response;
      }
    }

    // for everything else, try the network first, but
    // fall back to the cache if we're offline
    try {
      const response = await fetch(event.request);

      // if we're offline, fetch can return a value that is not a Response
      // instead of throwing - and we can't pass this non-Response to respondWith
      if (!(response instanceof Response)) {
        throw new Error("invalid response from fetch");
      }

      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }

      return response;
    } catch (err) {
      const response = await cache.match(event.request);

      if (response) {
        return response;
      }

      // if there's no cache, then just error out
      // as there is nothing we can do to respond to this request
      throw err;
    }
  }


  event.respondWith(respond());
});

//function to handle the request for the pmtiles file
async function handleRangeRequest(request) {
  // console.log("Service Worker handling range request for: ", request.url);
  const path = new URL(request.url).pathname;
  const pmtilesFile = await fetchPmtilesFile(path);
  const rangeHeader = request.headers.get("Range");

  // If there is a range header, then we use the service worker to respond to the HTTP Range Request
  // by getting the needed chunks from the locally cached static PMTiles file
  if (rangeHeader) {
    const rangeMatch = rangeHeader.match(/bytes=(\d+)-(\d+)?/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = rangeMatch[2]
        ? parseInt(rangeMatch[2], 10)
        : pmtilesFile.byteLength - 1;

      const chunk = pmtilesFile.slice(start, end + 1);
      return new Response(chunk, {
        status: 206,
        statusText: "Partial Content",
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": chunk.byteLength,
          "Content-Range": `bytes ${start}-${end}/${pmtilesFile.byteLength}`,
          "X-Sw-Tag": "Served by Service Worker"
        }
      });
    }
  }

  // If no Range header, return the entire file
  return new Response(pmtilesFile, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": pmtilesFile.byteLength
    }
  });
}

async function fetchPmtilesFile(path) {
  const cache = await caches.open(CACHE);
  const cachedResponse = await cache.match(path);

  if (cachedResponse) {
    return cachedResponse.arrayBuffer();
  }

  console.log("Fetching from network");
  const response = await fetch(path);
  const responseClone = response.clone();
  const responseBuffer = await response.arrayBuffer();

  try {
    await cache.put(path, responseClone);
  } catch (e) {
    console.log("Problem writing to cache: ", e);
  }

  return responseBuffer;
}