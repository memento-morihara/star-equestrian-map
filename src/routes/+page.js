import {categories} from "$lib/utils";
import {browser} from "$app/environment";
import {broncoLocations, counts, countsWithBronco, locations} from "$lib/db.js";

let data = {};
let url, id, initial;
let items;

export async function load({fetch}) {
    for (const category of categories) {
        data[category.name] = await fetch(`data-${category.name}.json`).then(res => res.json());
    }

    items = [...locations, ...broncoLocations];
    if (browser) {
        url = new URL(window.location.href);
        id = url.searchParams.get("id");
        initial = items.find(marker => marker.id === id);
    }

    return {
        locations: data,
        counts: {counts, countsWithBronco},
        searchId: id,
        initial: initial ?? null,
    };
}
