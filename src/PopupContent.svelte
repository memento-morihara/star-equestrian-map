<script>
    import {selectedMarkerId, stat} from "./stores.js";
    import RespawningContent from "./RespawningContent.svelte";
    import OneTimeContent from "./OneTimeContent.svelte";

    export let marker = $selectedMarkerId;


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

</script>

<div class="title" class:no-desc={!marker.options.description}>
    <strong>{marker.options.name}</strong>
    {#if stat(marker.options.name)}<img src={`./icons/${stat(marker.options.name)}.svg`} height="18"
                                title={stat(marker.options.name)} alt={`${stat(marker.options.name)}`}/>{/if}
</div>
{#if marker.options.markerType !== "respawning"}<p>{marker.options.description}</p>{/if}
<svelte:component this={popupContent()}/>

<style>
    strong {
        font-size: 1.3rem;
        vertical-align: middle;
        margin-right: 0.5rem;
    }

    p {
        font-size: 1rem;
        margin: 0.5em 0;
    }

    .no-desc {
        margin: 0 0 0.34em;
    }

    .title {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }
</style>
