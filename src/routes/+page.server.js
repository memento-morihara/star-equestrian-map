import PocketBase from "pocketbase";
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";

export async function load({ fetch }) {
  const db = new PocketBase(DB_URL);

  const fetchOptions = {
    method: "POST",
    body: {
      identity: DB_USER,
      password: DB_PASSWORD,
    },
  };

  await fetch(
    DB_URL + "/api/collections/users/auth-with-password",
    fetchOptions,
  );

  const broncoLocations = await db.collection("bronco").getFullList();
  const locations = await db.collection("withoutBronco").getFullList();
  const counts = await db.collection("countWithoutBronco").getFullList();
  const countsWithBronco = await db.collection("count").getFullList();

  db.authStore.clear();

  return { broncoLocations, locations, counts, countsWithBronco };
}
