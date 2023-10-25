import {categories} from "$lib/utils";
import {browser} from "$app/environment";

let data = {};
let url, id, initial;

export async function load({ fetch }) {
    for (const category of categories) {
        data[ category.name ] = await fetch(`data-${category.name}.json`).then(res => res.json());
    }
if (browser) {
     url = new URL(window.location.href);
     id = url.searchParams.get("id");
    let arr = [];

    if (id) {
        let d = Object.values(data)
        d.forEach(x => Object.values(x).flatMap(z => arr = [...arr, ...z.locations]))
        initial = arr.find(x => x.id === id);
    }
}


    return {
        locations: data,
        counts: Object.values(data).flatMap(category => category.flatMap(item => ({ name: item.name, count: item.locations.length }))),
        searchId: id,
        initial: initial ?? null,
    };
}
