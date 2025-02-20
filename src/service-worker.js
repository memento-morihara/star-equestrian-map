import { version } from "$service-worker";

const CACHE = `${version}`;

self.addEventListener("install", async (event) => {
  for (const key of await caches.keys()) {
    if (key !== CACHE) await caches.delete(key);
  }
});

self.addEventListener("activate", async (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const cache = caches.open(CACHE);
  const cached = caches.match(event.request);
  const fetched = fetch(event.request);
  const copy = fetched.then(res => res.clone());

  if (event.request.method !== "GET") return;

  event.respondWith(
    Promise.race([fetched.catch(() => cached), cached])
      .then(res => res || fetched)
      .catch((_) => {
      })
  );
  //
  // event.waitUntil(Promise.all([copy, cache]).then(
  //         ([res, cache]) => res.ok && cache.put(event.request, res)).catch((_) => {
  //     })
  // );
});

