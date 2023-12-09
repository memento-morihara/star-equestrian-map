import PocketBase from "pocketbase";
import {PUBLIC_DB_URL} from "$env/static/public";

// Temporarily reading from database to account for Bronco items

const db = new PocketBase(PUBLIC_DB_URL);

let broncoLocations;
let locations;
let counts;
let countsWithBronco;
async function init() {
    broncoLocations = await db.collection("bronco").getFullList();
    locations = await db.collection("withoutBronco").getFullList();
    counts = await db.collection("countWithoutBronco").getFullList();
    countsWithBronco = await db.collection("count").getFullList();
}

await init();

export {counts, locations, broncoLocations, countsWithBronco};