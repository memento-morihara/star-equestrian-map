<script>
    import {
        autoClosePopups,
        collectionProgress,
        selectedMarkerId,
    } from "./stores.js";
    import { fade } from "svelte/transition";

    export let marker = $selectedMarkerId;
    let collected = !!localStorage.getItem(`${marker.options.id}.collected`);

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
            case "Brazier":
                index = 4;
                break;
        }
        $collectionProgress[index] = adding
            ? $collectionProgress[index] + 1
            : $collectionProgress[index] - 1;
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
    $: collected = !!localStorage.getItem(`${marker.options.id}.collected`);
</script>

<div class="single-button">
    {#if collected}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <sl-button
            on:click={(e) => {
                uncollect();
                $autoClosePopups ? null : e.stopPropagation();
            }}
            in:fade={{ duration: 800 }}
            variant="danger"
            >Remove
        </sl-button>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <sl-button
            on:click={(e) => {
                collect();
                $autoClosePopups ? null : e.stopPropagation();
            }}
            in:fade={{ duration: 800 }}
            variant="primary"
            >Collect
        </sl-button>
    {/if}
</div>

<style>
    .single-button {
        margin: 0.3em auto 0.1em;
        width: 50%;
        max-width: 150px;
    }

    .single-button sl-button {
        width: 100%;
        margin: 0 auto;
    }
</style>
