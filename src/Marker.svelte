<script>
    import {getContext, onMount, setContext, tick} from "svelte";
    import {derived, writable} from "svelte/store";
    import {renderer} from "./stores.js";
    import {markerState} from "./state.js";
    import Popup from "./Popup.svelte";
    import RespawningContent from "./RespawningContent.svelte";
    import CollectButtons from "./CollectButtons.svelte";
    import PopupContent from "./PopupContent.svelte";

    const {getMap, getOms} = getContext("map");
    const map = getMap();
    const oms = getOms();

    oms.addListener('spiderfy', function () {
        map.closePopup();
    });

    export let marker;
    // marker.addTo(map);

    const options = writable(marker.options)

    setContext("marker", {
        getMarker: () => marker,
        collect,
        noRespawn,
        uncollect,
        lastCollected: writable(0),
        isCollected: writable(false)
    });

    const state = writable({});

    switch ($options.markerType) {
        case "respawning":
            $options.lastCollected = localStorage[$options.id + ".lastCollected"];
            $options.lastNegativeRespawn = localStorage[$options.id + ".lastNegativeRespawn"];
            break;
        case "one-time":
            $options.collected = !!localStorage[$options.id + ".collected"];
            break;
    }

    function collect() {
        if ($options.markerType === "respawning"){
            localStorage.setItem(`${$options.id}.lastCollected`, Date.now().toString())
            $options.lastCollected = localStorage.getItem(`${$options.id}.lastCollected`);
        } else {
            localStorage.setItem(`${$options.id}.collected`, "true");
            $options.collected = true;
        }
        marker.setOpacity(0.5);
    }

    function noRespawn() {
        localStorage.setItem(`${$options.id}.lastNegativeRespawn`, Date.now().toString());
        // $state.lastNegativeRespawn = localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`)
        marker.setOpacity(0.5);
    }

    function uncollect() {
        if ($options.markerType === "respawning"){
            localStorage.removeItem(`${$options.id}.lastCollected`)
            $options.lastCollected = null;
        } else {
            localStorage.removeItem(`${$options.id}.collected`);
            $options.collected = false;
        }
        marker.setOpacity(1);
    }



    // export const initMarkerStore = () => {
    //
    // if (marker.options.markerType === "respawning") {
    //     return {lastCollected: Number(localStorage?.getItem(`${marker.options.id}.lastCollected`)), lastNegativeRespawn: 0};
    // } else if (marker.options.markerType === "one-time") {
    //     return {collected: !!localStorage.getItem(`${marker.options.id}.collected`)};
    // }
    // else {
    //     return {}
    // }
    // }
    //
    // const state = marker.options.markerType === "respawning" ? {lastCollected: localStorage.getItem(`${marker.options.id}.lastCollected`), lastNegativeRespawn: localStorage.getItem(`${marker.options.id}.lastNegativeSpawn`)}
    //     : {collected: !!localStorage.getItem(`${marker.options.id}.collected`)};
    // export const collectedState = writable(state);
    //
    //
    // function collect(marker) {
    //     if (marker.options.markerType === "respawning"){
    //         localStorage.setItem(`${marker.options.id}.lastCollected`, Date.now().toString())
    //         $stateStore.lastCollected = localStorage.getItem(`${marker.options.id}.lastCollected`);
    //     } else {
    //         localStorage.setItem(`${marker.options.id}.collected`, "true");
    //         $stateStore.collected = true;
    //     }
    //         marker.setOpacity(0.5);
    // }
    //
    // function noRespawn(marker) {
    //     localStorage.setItem(`${marker.options.id}.lastNegativeRespawn`, Date.now().toString());
    //     $stateStore.lastNegativeRespawn = localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`)
    //     marker.setOpacity(0.5);
    // }
    //
    // async function uncollect(marker) {
    //     if (marker.options.markerType === "respawning"){
    //         localStorage.removeItem(`${marker.options.id}.lastCollected`)
    //         marker.options.lastCollected = null;
    //     } else {
    //         localStorage.removeItem(`${marker.options.id}.collected`);
    //     }
    //     marker.setOpacity(1);
    // }
    let popup;
    function createPopup() {
        popup = L.popup({content: "I'm a popup"});
        marker.bindPopup(popup)
    }

    function createMarker(node, marker) {
        marker = L.marker({...marker})
        popup = L.popup({content: "I'm a popup"});
        marker.bindPopup(popup)
    }

    const component = () => {
        switch (marker.options.markerType) {
            case "respawning":
                return RespawningContent;
        }
    }

    marker.bindPopup(L.popup().setContent(component()))

</script>
    {#if marker}
<!--        <div use:createMarker={{marker}}>-->
<!--        <Popup />-->
<!--        </div>-->
        <slot />
    {/if}


