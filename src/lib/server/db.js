import PocketBase from "pocketbase";
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";

const db = new PocketBase(DB_URL);
await db.admins.authWithPassword(DB_USER, DB_PASSWORD);

export async function createOrUpdateMarker(data) {
  if (data.id) {
    await db.collection("locations_new").update(data.id, data);
  } else {
    await db.collection("locations_new").create(data);
  }
}
