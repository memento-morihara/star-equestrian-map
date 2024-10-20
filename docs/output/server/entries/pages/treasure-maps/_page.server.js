import PocketBase from "pocketbase";
import { D as DB_URL, a as DB_USER, b as DB_PASSWORD } from "../../../chunks/private.js";
const prerender = false;
async function load({ fetch }) {
  const db = new PocketBase(DB_URL);
  await db.admins.authWithPassword(DB_USER, DB_PASSWORD);
  const locations = await db.collection("treasure").getFullList();
  locations.forEach((location) => {
    location.media = location.media.length < 1 ? null : db.getFileUrl(location, location.media[0]);
  });
  return {
    data: JSON.stringify(
      locations.map((loc) => ({ id: loc.id, media: loc.media }))
    )
  };
}
export {
  load,
  prerender
};
