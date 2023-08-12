<script>
    import {getContext, createEventDispatcher, onMount} from "svelte";

    export let collected;

    const marker = getContext('marker')();
    const dispatch = createEventDispatcher();

    let date = localStorage.getItem(`${marker.options.id}.lastCollected`);
    let previous = date;
    let negSpawnDate = localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`);

    function collect() {
        localStorage.setItem(`${marker.options.id}.lastCollected`, Date.now().toString());
        localStorage.removeItem(`${marker.options.id}.lastNegativeRespawn`);
        date = Date.now();
        collected = true;
        marker.setOpacity(0.5);
        dispatch("collected");
    }

    function uncollect() {
        if (previous) {
            localStorage.setItem(`${marker.options.id}.lastCollected`, previous);
            date = previous;
        } else {
            localStorage.removeItem(`${marker.options.id}.lastCollected`);
            date = null;
        }
        collected = false;
        marker.setOpacity(1);
        dispatch("collected");
    }

    function noRespawn() {
        localStorage.setItem(`${marker.options.id}.lastNegativeRespawn`, Date.now().toString());
        marker.setOpacity(0.5);
        negSpawnDate = Date.now();
        notRespawned = true;
    }

    function undoNoRespawn() {
        localStorage.removeItem(`${marker.options.id}.lastNegativeRespawn`);
        marker.setOpacity(1);
        notRespawned = false;
    }

    $: date = localStorage.getItem(`${marker.options.id}.lastCollected`);
    $: negSpawnDate = localStorage.getItem(`${marker.options.id}.lastNegativeRespawn`);
    // Check if an item was collected today
    $: collected = new Date(Number(date)).getDay() === new Date().getDay();
    $: notRespawned = new Date(Number(negSpawnDate)).getDate() === new Date().getDate();

</script>

<div class="container">
    <small>Last collected:
        {#if date}
            <sl-relative-time date={new Date(Number(date))} sync></sl-relative-time>
        {:else}
            N/A
        {/if}
    </small>
    {#if notRespawned}
        <small>
            Last checked:
            <sl-relative-time date={new Date(Number(negSpawnDate))} sync></sl-relative-time>
        </small>
    {/if}
    {#if marker.options.description}<p>{marker.options.description}</p>{/if}
    {#if collected}
        <div class="spawn-buttons">
            <sl-button on:click={uncollect} variant="default">Remove</sl-button>
        </div>
    {:else if notRespawned}
        <sl-button on:click={undoNoRespawn}>Remove</sl-button>
    {:else}
        <div class="spawn-buttons">
            <sl-button on:click={collect} variant="primary">Collect</sl-button>
            <sl-icon-button on:click={noRespawn} class="no-respawn" name="calendar-x"
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

    sl-icon-button {
        font-size: 1.8em;
        padding: 0;
    }

    .spawn-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 0.2em auto 0;
        width: 100%;
    }

    p {
        margin: 0.5em 0;
    }
</style>
