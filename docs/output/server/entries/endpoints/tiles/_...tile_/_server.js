function GET({ route, fetch }) {
  const image = async () => await fetch(`${route.id}.webp`);
  if (image) {
    return new Response(image, {
      headers: {
        "Content-Type": "image/webp"
      }
    });
  } else {
    return new Response(null, {
      status: 200
    });
  }
}
export {
  GET
};
