<script>
    import {getContext, onMount, setContext} from "svelte";
    import {browser} from "$app/environment";
    import {markerData} from "$lib/markerData";
    import {allMarkers, collectibleStores, selectedMarker, settings} from "$lib/stores.js";
    import {isCollected, slugifyName} from "$lib/utils.js";
    import {localStorageStore} from "@skeletonlabs/skeleton";
    import PopupContent from "$lib/Popup.svelte";

    export let location;

    let marker;
    setContext("marker", () => marker);

    const groups = getContext("groups")();
    const oms = getContext("oms")();
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

            // oms && oms.addMarker(marker);

            marker.on("click", () => {
                $selectedMarker = marker;
                $selectedMarker.openPopup();
                new PopupContent({
                    target: document.getElementById($selectedMarker.options.id),
                });
            });

            // Hide or set opacity for markers that have been collected or checked
            if (isCollected(marker) >= 0) {
                if ($settings.hideCollectedMarkers) {
                    marker.remove()
                } else {
                    marker.setOpacity($settings.markerOpacity)
                }
            }

            // Add collectibles to a store to keep track of progress
            if (marker.options.markerType === "one-time" && !["Legendary Chest", "Quest Item"].includes(marker.options.name)) {
                $collectibleStores = [...$collectibleStores, {
                    name: marker.options.name,
                    id: marker.options.id,
                    store: marker.options.store
                }]
            }
        });
    }
</script>

{#if marker}
    <slot />
{/if}
