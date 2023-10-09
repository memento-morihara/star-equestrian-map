<script>
    import { getContext, setContext, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { markerData } from "$lib/markerData";

    export let location;

    let marker;
    let popup;
    setContext("marker", () => marker);

    const map = getContext("map")();

    function initPopup(marker) {
        popup = marker.bindPopup(
            L.popup({
                minWidth: 210,
                content: `<div id="${marker.options.id}"></div>`,
            })
        );
    }

    if (browser && window) {
        onMount(async () => {
            const props = await markerData().then((data) =>
                data
                    .flatMap((obj) => obj.items)
                    .find((obj) => obj.name === location.name)
            );
            const L = await import("leaflet");
            marker = L.marker([location.lat, location.lng], {
                id: location.id,
                description: location.description,
                ...props,
            }).addTo(map);
            initPopup(marker);
        });
    }
</script>

{#if marker}
    <slot />
{/if}
