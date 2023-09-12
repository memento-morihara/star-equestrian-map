export function GET({ route, fetch }) {
    // Leaflet makes requests in the [baseUrl]/x/y/z format,
    // so this route uses the SvelteKit rest parameter to match the request
    // and route.id from the request object to get the x/y/z values
    const image = async () => await fetch(`${route.id}.webp`);

    if (image) {
        return new Response(image, {
            headers: {
                "Content-Type": "image/webp",
            }
        });
    } else {
        // This also has the benefit of not console.erroring every request to a nonexistent tile
        return new Response(null, {
            status: 200,
        });
    }
}