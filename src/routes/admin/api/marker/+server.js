import { createOrUpdateMarker } from "$lib/server/db.js";

export const POST = async ({ request }) => {
  const data = await request.json();

  const response = await createOrUpdateMarker(data);
  return new Response({ status: 200 });
};