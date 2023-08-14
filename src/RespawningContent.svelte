<script>
    import {getContext, createEventDispatcher} from "svelte";
    import {fade, slide} from "svelte/transition";

    const marker = getContext('marker')();
    const dispatch = createEventDispatcher();

    export let date = localStorage.getItem(`${marker.options.id}.lastCollected`);
    let previousCollected = date;
    export let negSpawnDate = localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`);
    let previousNoSpawn = negSpawnDate;

    $: collected = new Date(Number(date)).getUTCDate() === new Date().getUTCDate();
    $: notRespawned = new Date(Number(negSpawnDate)).getUTCDate() === new Date().getUTCDate();

    function collect(e) {
        localStorage.setItem(`${marker.options.id}.lastCollected`, Date.now().toString());
        localStorage.removeItem(`${marker.options.id}.lastNegativeRespawn`);
        date = Date.now();
        collected = true;
        marker.setOpacity(0.5);
        dispatch("collected", marker.options.id);

    }

    function uncollect() {
        // If a date exists in localStorage, revert to it as long is it is not today
        if (previousCollected && new Date(Number(previousCollected)).getUTCDate() < new Date().getUTCDate()) {
            localStorage.setItem(`${marker.options.id}.lastCollected`, previousCollected);
            date = previousCollected;
        } else {
            localStorage.removeItem(`${marker.options.id}.lastCollected`);
            date = null;
        }
        marker.setOpacity(1);
        dispatch("collected", marker.options.id);
    }

    function noRespawn() {

        localStorage.setItem(`${marker.options.id}.lastNegativeRespawn`, Date.now().toString());
        marker.setOpacity(0.5);
        negSpawnDate = Date.now();
    }

    function undoNoRespawn() {
        // If a date exists in localStorage, revert to it as long is it is not today
        if (previousNoSpawn && new Date(Number(previousNoSpawn)).getUTCDate() < new Date().getUTCDate()) {
            localStorage.setItem(`${marker.options.id}.lastNegativeRespawn`, previousNoSpawn);
            negSpawnDate = previousNoSpawn;
        } else {

        localStorage.removeItem(`${marker.options.id}.lastNegativeRespawn`);
            negSpawnDate = null;
        }
        marker.setOpacity(1);
    }

    const fadeTransition = {duration: 800}

</script>

<div class="container">
    <small>Last collected:
        {#if date}
            <sl-relative-time in:fade={fadeTransition} date={new Date(Number(date))} sync></sl-relative-time>
        {:else}
            <span in:fade={fadeTransition}>N/A</span>
        {/if}
    </small>
    {#if notRespawned || previousNoSpawn}
        <small transition:slide>
            Last checked:
            <sl-relative-time date={new Date(Number(negSpawnDate))} sync></sl-relative-time>
        </small>
    {/if}
    {#if marker.options.description}<p>{marker.options.description}</p>{/if}
    {#if collected}
        <div class="spawn-buttons" in:fade={fadeTransition}>
            <sl-button on:click|stopPropagation={uncollect} variant="danger">Remove</sl-button>
        </div>
    {:else if notRespawned}
        <div class="spawn-buttons" in:fade={fadeTransition}>
            <sl-button on:click|stopPropagation={undoNoRespawn} variant="danger">Remove</sl-button>
        </div>
    {:else}
        <div class="spawn-buttons" in:fade={fadeTransition}>
            <sl-button on:click|stopPropagation={collect} variant="primary">Collect</sl-button>
            <sl-icon-button on:click|stopPropagation={noRespawn} class="no-respawn" name="calendar-x"
                            label="Not respawned"></sl-icon-button>
        </div>
    {/if}
</div>

<style>
    .container {
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    small {
        margin: 0.2em 0 0.3em;
    }

    sl-icon-button::part(base) {
        font-size: 1.5em;
        margin: 0;
        vertical-align: center;
    }

    .spawn-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 0.3em auto 0;
        width: 100%;

    }

    .spawn-buttons sl-button {
        width: 50%;
    }

    p {
        margin: 0.3em 0;
    }

</style>
