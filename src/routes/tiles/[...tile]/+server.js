// Basically a development server since production build is a static site

export function GET({ route, fetch }) {
  // Leaflet makes requests in the [baseUrl]/z/x/y format,
  // so this route uses the SvelteKit rest parameter to match the request
  // and route.id from the request object to get the z/x/y values
  const image = async () => await fetch(`${route.id}.webp`);

  if (image) {
    return new Response(image, {
      headers: {
        "Content-Type": "image/webp"
      }
    });
  } else {
    // This also has the benefit of not console.erroring every request to a nonexistent tile
    return new Response(null, {
      status: 200
    });
  }
}