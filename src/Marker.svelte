<script>
    import {getContext, setContext} from "svelte";
    import {chests, collectibles, food, other, resources} from "../markers.js";
    import {allMarkers} from "./stores.js";

    // oms.addListener('spiderfy', function () {
    //     map.closePopup();
    // });

    export let marker = undefined;
    export let latLng;

    let thisMarker;
    setContext("marker", () => thisMarker);

    const map = getContext("map")();
    const icons = [food, chests, resources, collectibles, other].flat();

    function markerProps() {
        let markerIcon = icons.find(i => i.name === marker.name);
        let props =
            {
                id: marker.id,
                name: marker.name,
                markerType: markerIcon.markerType,
                icon: markerIcon.icon,
                description: marker.description,
                category: marker.category,
            }
        if (props.markerType === "respawning") {
            props.respawnTime = markerIcon.respawnTime;
            props.collected = localStorage.getItem(`${marker.id}.lastCollected`) && new Date(Number(localStorage.getItem(`${marker.id}.lastCollected`))).getUTCDate() === new Date().getUTCDate();
        } else if (props.markerType === "one-time") {
            props.collected = !!localStorage.getItem(`${marker.id}.collected`);
        }
        return props;
    }

    thisMarker = L.marker(latLng, {...markerProps()}).addTo(map);
    $allMarkers = [...$allMarkers, thisMarker]
</script>

{#if thisMarker}
    <slot/>
{/if}


