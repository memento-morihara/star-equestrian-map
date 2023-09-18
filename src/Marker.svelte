<script>
    import { getContext, setContext } from "svelte";
    import {
        chests,
        collectibles,
        food,
        other,
        traders,
        resources,
    } from "../markers.js";
    import { allMarkers } from "./stores.js";

    export let marker = undefined;

    let thisMarker;
    setContext("marker", () => thisMarker);

    const map = getContext("map")();
    const icons = [
        food,
        chests,
        resources,
        traders,
        collectibles,
        other,
    ].flat();

    let markerIcon = icons.find((i) => i.name === marker.name);
    function markerProps() {
        let props = {
            id: marker.id,
            name: marker.name,
            markerType: markerIcon?.markerType,
            icon: markerIcon?.icon ?? L.icon({ iconUrl: "./icons/common.svg" }),
            description: marker.description,
            category: markerIcon?.category,
            stat: markerIcon?.stat,
        };
        if (props.markerType === "respawning") {
            props.respawnTime = markerIcon.respawnTime;
            props.collected =
                localStorage.getItem(`${marker.id}.lastCollected`) &&
                new Date(
                    Number(localStorage.getItem(`${marker.id}.lastCollected`))
                ).getUTCDate() === new Date().getUTCDate();
        } else if (props.markerType === "one-time") {
            props.collected = !!localStorage.getItem(`${marker.id}.collected`);
        }
        return props;
    }

    thisMarker = L.marker([marker.lat, marker.lng], { ...markerProps() }).addTo(
        map
    );
    $allMarkers = [...$allMarkers, thisMarker];
</script>

{#if thisMarker}
    <slot />
{/if}