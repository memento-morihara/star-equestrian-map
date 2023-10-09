import PocketBase from 'pocketbase';

const db = new PocketBase("https://panicky-potato.pockethost.io");

export async function load({ fetch, url }) {
    let searchId = null;
    if (new URLSearchParams(url.search).get("id")) {
        searchId = new URLSearchParams(url.search).get("id")
    }
    return {
        searchId: searchId,
        data: fetch("/src/lib/data.json").then(res => res.json()),
        locations: await db.collection("list_new").getFullList(),
        counts: await db.collection("count").getFullList(),
    };
}