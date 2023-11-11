<script>
    import {getContext, onMount, setContext} from "svelte";
    import {browser} from "$app/environment";
    import {markerData} from "$lib/markerData";
    import {allMarkers, collectibleStores, selectedMarker, settings} from "$lib/stores.js";
    import {slugifyName} from "$lib/utils.js";
    import {localStorageStore} from "@skeletonlabs/skeleton";
    import {get} from "svelte/store";
    import PopupContent from "$lib/Popup.svelte";

    export let location;

    let store;
    let marker;
    setContext("marker", () => marker);

    const groups = getContext("groups")();

    function initPopup(marker) {
        marker.bindPopup(
            L.popup({
                minWidth: 230,
                content: `<div id="${marker.options.id}"></div>`,
            })
        );
    }

    const lsTemplate = (type) => {
        if (type === "respawning") {
            return { lastCollected: [null], lastChecked: [null] };
        } else if (type === "one-time") {
            return {};
        }
    };

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
                riseOnHover: true,
                store: localStorageStore(
                    location.id,
                    lsTemplate(props.markerType)
                ),
                ...props,
            });
            initPopup(marker);
            const name = slugifyName(marker.options.name);

            groups[name] && groups[name].addLayer(marker);
            marker.options.group = groups[name];
            $allMarkers = [...$allMarkers, marker];

            if (marker.options.markerType === "one-time" && !["Legendary Chest", "Quest Item"].includes(marker.options.name)) {
                $collectibleStores = [...$collectibleStores, {name: marker.options.name, store: marker.options.store}]
            }

            marker.on("click", () => {
                $selectedMarker = marker;
                $selectedMarker.openPopup();
                new PopupContent({
                    target: document.getElementById($selectedMarker.options.id),
                });
            });

            let lastCollected = get(marker.options.store)?.lastCollected;

            if (lastCollected) {
                if (
                    new Date(lastCollected).getUTCDate() ===
                    new Date().getUTCDate()
                ) {
                    marker.setOpacity($settings.markerOpacity);
                }
            }
        });
    }
</script>

{#if marker}
    <slot />
{/if}
