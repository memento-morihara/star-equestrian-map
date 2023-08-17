<script>
    import L from 'leaflet';
    import {createEventDispatcher, getContext, onMount} from 'svelte';
    import RespawningContent from "./RespawningContent.svelte";
    import OneTimeContent from "./OneTimeContent.svelte";

    export let popup = undefined;
    export let collected;
    export let notRespawned;

    const dispatch = createEventDispatcher();
    const marker = getContext('marker')();

    // export let marker;
    let showContents = false;
    let popupOpen = false;
    let popupEl;

    const popupContent = () =>  {
        switch(marker.options.markerType) {
            case "respawning":
                return RespawningContent;
            case "one-time":
                return OneTimeContent
            case "static":
                return null;
        }
    }

    onMount(() =>{
        popup = L.popup({minWidth: 200, minHeight: 180, maxWidth: 300})
        marker.bindPopup(popup);

        marker.on('popupopen', () => {
            popupOpen = true;
            showContents = true;
            popup.setContent(popupEl)
        });

        if (marker.options.markerType === "respawning" && collected) {
            marker.setOpacity(0.5);
        } else if (marker.options.markerType === "respawning" && notRespawned) {
            marker.setOpacity(0.5);
        } else if (marker.options.markerType === "one-time" && collected) {
            marker.setOpacity(0.5);
        } else {
            marker.setOpacity(1);
        }
    })
</script>

<div class="container" class:centered={marker.options.markerType === "static" && !marker.options.description} bind:this={popupEl}>
    {#if showContents}
        <slot name="title" />
        <!--    Respawning markers add their own description, so don't show here    -->
        {#if marker.options.markerType !== "respawning"}<slot name="description" />{/if}
        <svelte:component this={popupContent()}/>
    {/if}
</div>

<style>
    .container {
        font-size: 1.14em;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .centered {
        margin: 0 auto;
        text-align: center;
        flex-wrap: nowrap;
    }
</style>

