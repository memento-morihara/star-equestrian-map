<script>
    import {getContext} from "svelte";
    import {collectionProgress} from "./stores.js";

    export let collected;

    const marker = getContext("marker")();

    function updateCollectionProgress(name, adding) {
        let index;
        switch (name) {
            case "Toy Unicorn":
                index = 0;
                break;
            case "Horseshoe":
                index = 1;
                break;
            case "Sheriff Badge":
                index = 2;
                break;
            case "Bottle":
                index = 3;
                break;
        }
        $collectionProgress[index] = adding ? $collectionProgress[index] + 1 : $collectionProgress[index] - 1;
    }

    function collect() {
        localStorage.setItem(`${marker.options.id}.collected`, "true");
        collected = true;
        marker.setOpacity(0.5);
        updateCollectionProgress(marker.options.name, true);
    }

    function uncollect() {
        localStorage.removeItem(`${marker.options.id}.collected`);
        collected = false;
        marker.setOpacity(1);
        updateCollectionProgress(marker.options.name, false);
    }

    $: collected ? marker.setOpacity(0.5) : marker.setOpacity(1);
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