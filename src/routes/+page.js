import PocketBase from 'pocketbase';

const db = new PocketBase("https://panicky-potato.pockethost.io");
let data = {};

export async function load({ fetch }) {
    for (const category of [ "chest", "collectible", "food", "npc", "other", "resource", "tack" ]) {
        data[ category ] = await fetch(`data-${category}.json`).then(res => res.json());
    }

    return {
        locations: data,
        counts: await db.collection("count").getFullList(),
    };
}
