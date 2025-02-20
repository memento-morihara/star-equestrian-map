import PocketBase from "pocketbase";
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";

export const prerender = true;

export async function load({ fetch }) {
  const db = new PocketBase(DB_URL);
  await db.admins.authWithPassword(DB_USER, DB_PASSWORD);

  const locations = await db.collection("treasure").getFullList();

  locations.forEach((location) => {
    location.media =
      location.media.length < 1
        ? null
        : db.getFileUrl(location, location.media[0]);
  });

  return {
    data: JSON.stringify(
      locations.map((loc) => ({ id: loc.id, media: loc.media }))
    )
  };
}
