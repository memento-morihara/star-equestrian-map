import {categories} from "$lib/utils";
import {browser} from "$app/environment";

let data = {};
let url, id, initial;
let items;

export async function load({ fetch }) {
    for (const category of categories) {
        data[ category.name ] = await fetch(`data-${category.name}.json`).then(res => res.json());
    }

    items = Object.values(data).flat();
if (browser) {
     url = new URL(window.location.href);
     id = url.searchParams.get("id");
    let arr = [];

    if (id) {
        items.flatMap(item => arr = [...arr, ...item.locations]);
        initial = arr.find(x => x.id === id);
    }
}

    return {
        locations: data,
        counts: items.map(item => ({name: item.name, count: item.locations.length})),
        searchId: id,
        initial: initial ?? null,
    };
}
