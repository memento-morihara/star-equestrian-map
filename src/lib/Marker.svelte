<script>
    import { getContext, setContext, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { slugifyName } from "$lib/utils";
    import { markerData } from "$lib/markerData";

    export let location;

    let marker;
    setContext("marker", () => marker);

    const map = getContext("map")();

    onMount(async () => {
        const props = await markerData().then((data) =>
            data
                .flatMap((obj) => obj.items)
                .find((obj) => obj.name === location.name)
        );
        if (browser && markerData) {
            const L = await import("leaflet");
            marker = L.marker([location.lat, location.lng], {
                description: location.description,
                ...props,
            }).addTo(map);
        }
        marker.bindPopup(
            L.popup({
                minWidth: 210,
            })
        );
    });
</script>

{#if marker}
    <slot />
{/if}
