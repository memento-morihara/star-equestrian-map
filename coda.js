import { baseUrl, apiKey } from "./dev/credentials.js";

let result = []

let nextPageUrl = baseUrl;
async function getRemote(url) {

	let response = await fetch(url, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + apiKey
		}
	});
	nextPageUrl = await response.json().then(r => {
		for (let item of r.items) {
			result.push({
				lat: item.values.Lat,
				long: item.values.Lng,
				name: item.values.Name,
				description: item.values.Description
			})
		}
		return r.nextPageLink
	}
	)
}

export async function getLocations() {
	do {
		await getRemote(nextPageUrl)
	} while (nextPageUrl)

	return result;
}


export async function upsert(rows) {
	let body = rows.map(r => {
		return { ...r, id: r.id ?? crypto.randomUUID() };
	})
	await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + apiKey
		},
		body: JSON.stringify({ rows: body, keyColumns: [ "c-fCAGFJrOnb" ] })
	});
}