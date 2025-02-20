import PocketBase from "pocketbase";
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";

export const prerender = true;

export async function load({ fetch }) {
  const db = new PocketBase(DB_URL);
  await db.admins.authWithPassword(DB_USER, DB_PASSWORD);

  const broncoLocations = await db.collection("bronco").getFullList();
  const locations = await db.collection("withoutBronco").getFullList();
  const counts = await db.collection("countWithoutBronco").getFullList();
  const countsWithBronco = await db.collection("count").getFullList();

  locations.forEach((location) => {
    location.media =
      location.media.length < 1
        ? null
        : db.files.getUrl(location, location.media[0]);
  });

  return {
    data: JSON.stringify({
      broncoLocations,
      locations,
      counts,
      countsWithBronco
    })
  };
}
