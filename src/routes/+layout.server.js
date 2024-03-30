import PocketBase from "pocketbase";
import { DB_URL, DB_USER } from "$env/static/private";

export const prerender = true;

export async function load({ fetch }) {
  async function makeRequest(collection, config, page) {
    return await fetch(
      `${DB_URL}/api/collections/${collection}/records?page=${page}&perPage=500`,
      config,
    );
  }

  async function getData(collection, config) {
    let allItems = [];
    let page = 1;
    let totalPages = 1;

    // Loop to fetch any subsequent pages
    do {
      const res = await makeRequest(collection, config, page);
      await res.json().then((r) => {
        totalPages = r.totalPages;
        page = r.page + 1;

        allItems = [...allItems, ...r.items];
      });
    } while (page <= totalPages);

    return allItems;
  }

  const db = new PocketBase(DB_URL);
  await fetch(DB_URL + "/api/admins/auth-with-password", {
    method: "POST",
    body: {
      identity: DB_USER,
      password: DB_PASSWOR,
    ,
  });

  const broncoLocations = await getData("bronco");
  const locations = await getData("withoutBronco");
  const counts = await getData("countWithoutBronco");
  const countsWithBronco = await getData("count");

  locations.forEach((location) => {
    location.media =
      location.media.length < 1
        ? null
        : db.getFileUrl(location, location.media[0]);
  });

  return {
    data: JSON.stringify({
      broncoLocations,
      locations,
      counts,
      countsWithBronco,
    }),
  };
}
