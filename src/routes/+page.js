import PocketBase from 'pocketbase';

const db = new PocketBase("https://panicky-potato.pockethost.io");
let data = {};

export async function load({ fetch, url }) {
    let searchId = null;
    if (new URLSearchParams(url.search).get("id")) {
        searchId = new URLSearchParams(url.search).get("id")
    }

    for (const category of ["chest", "collectible", "food", "npc", "other", "resource", "tack"]) {
      data[category] = await fetch(`data-${category}.json`).then(res => res.json());
    }

    return {
        searchId: searchId,
        locationsNew: data,
        counts: await db.collection("count").getFullList(),
    };
}
