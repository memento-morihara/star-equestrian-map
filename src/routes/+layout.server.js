import PocketBase from "pocketbase";
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";

export async function load({ fetch }) {
  const db = new PocketBase(DB_URL);
  await db.admins.authWithPassword(DB_USER, DB_PASSWORD);

  const broncoLocations = await db.collection("bronco").getFullList();
  const locations = await db.collection("withoutBronco").getFullList();
  const counts = await db.collection("countWithoutBronco").getFullList();
  const countsWithBronco = await db.collection("count").getFullList();

  return {
    data: JSON.stringify({
      broncoLocations,
      locations,
      counts,
      countsWithBronco,
    }),
  };
}
