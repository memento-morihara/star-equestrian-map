import PocketBase from "pocketbase";
import { D as DB_URL, a as DB_USER, b as DB_PASSWORD } from "../../chunks/private.js";
const prerender = false;
async function load({ fetch }) {
  const db = new PocketBase(DB_URL);
  await db.admins.authWithPassword(DB_USER, DB_PASSWORD);
  const broncoLocations = await db.collection("bronco").getFullList();
  const locations = await db.collection("withoutBronco").getFullList();
  const counts = await db.collection("countWithoutBronco").getFullList();
  const countsWithBronco = await db.collection("count").getFullList();
  locations.forEach((location) => {
    location.media = location.media.length < 1 ? null : db.getFileUrl(location, location.media[0]);
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
export {
  load,
  prerender
};
