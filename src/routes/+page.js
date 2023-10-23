import { categories } from "$lib/utils";
import {browser} from "$app/environment";

let data = {};
let url, id;

export async function load({ fetch }) {
    for (const category of categories) {
        data[ category.name ] = await fetch(`data-${category.name}.json`).then(res => res.json());
    }
if (browser) {
     url = new URL(window.location.href);
     id = url.searchParams.get("id");
}


    return {
        locations: data,
        counts: Object.values(data).flatMap(category => category.flatMap(item => ({ name: item.name, count: item.locations.length }))),
        searchId: id,
    };
}
