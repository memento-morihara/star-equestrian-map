import PocketBase from 'pocketbase';

const db = new PocketBase("https://panicky-potato.pockethost.io");

export async function load() {
    return {
        locations: await db.collection("list_new").getFullList(),
        counts: await db.collection("count").getFullList(),
    };
}