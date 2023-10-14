import { categories } from "$lib/utils";

let data = {};

export async function load({ fetch }) {
    for (const category of categories) {
        data[ category.name ] = await fetch(`data-${category.name}.json`).then(res => res.json());
    }

    return {
        locations: data,
        counts: Object.values(data).flatMap(category => category.flatMap(item => ({ name: item.name, count: item.locations.length }))),
    };
}
