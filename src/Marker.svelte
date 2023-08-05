<script>
    import {getContext, setContext} from "svelte";

    export let latLng;
    export let icon;
    export let options;
    export let map;

    let marker;

    setContext(map, {
        getMap: () => map,
    });

    setContext(L.Layer, {
        getLayer: () => marker,
    });

    setContext(L.Marker, {
        getMarker: () => marker,
    });
</script>


    <slot />
