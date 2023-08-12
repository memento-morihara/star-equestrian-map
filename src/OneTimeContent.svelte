<script>
    import {getContext} from "svelte";

    const {getMarker, collectMarker} = getContext("marker");
    const marker = getMarker();

    function handleCollect() {
        // collectMarker();
    }
</script>

<div class="container">
    <strong class:no-desc={!marker.options.description}>{marker.options.name}</strong>
    {#if marker.options.description}
        <p>{marker.options.description}</p>
    {/if}
    <div class="single-button">
        <sl-button use:handleCollect variant="primary">Collect</sl-button>
    </div>
</div>

<style>
    .container {
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    strong {
        font-size: 1.3rem;
        vertical-align: middle;
    }
    .no-desc {
        margin: 0 0 0.34em;
    }

    .single-button {
        margin: 0.5em auto 0;
        width: 80%;
        max-width: 150px;
    }

    .single-button sl-button {
        width: 100%;
    }

    p {
        margin: 0.5em 0 0.8em;
    }
</style>