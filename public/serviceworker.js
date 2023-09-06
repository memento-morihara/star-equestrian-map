const cacheName = "se-map-cache";

const addToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (e) => {
  e.waitUntil(addToCache("/"));
});

self.addEventListener("fetch", (e) => {
  if (e.request.destination === "image") {
  }
});
