<script>
    import {getContext} from "svelte";

    export let collected;

    const marker = getContext("marker")();

    function collect() {
        localStorage.setItem(`${marker.options.id}.collected`, "true");
        collected = true;
        marker.setOpacity(0.5);
    }

    function uncollect() {
        localStorage.removeItem(`${marker.options.id}.collected`);
        collected = false;
        marker.setOpacity(1);
    }

    $: collected = localStorage.getItem(`${marker.options.id}.collected`);
</script>


<div class="single-button">
    {#if collected}
        <sl-button on:click={uncollect} variant="default">Remove</sl-button>
    {:else}
        <sl-button on:click={collect} variant="primary">Collect</sl-button>
    {/if}
</div>

<style>
    .single-button {
        margin: 0.5em auto 0;
        width: 80%;
        max-width: 150px;
    }

    .single-button sl-button {
        width: 100%;
    }
</style>