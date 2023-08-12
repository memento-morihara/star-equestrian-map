<script>
    import {getContext} from "svelte";
    import RespawningContent from "./RespawningContent.svelte";

    const {getMarker} = getContext("marker");
    const marker = getMarker();
</script>

{#if marker.options.markerType === "respawning"}
    <RespawningContent isCollected={false} />
{/if}