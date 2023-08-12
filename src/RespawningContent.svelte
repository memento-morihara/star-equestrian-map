<script>
    import {afterUpdate, beforeUpdate, getContext, createEventDispatcher} from "svelte";
    import {derived, writable} from "svelte/store";
    import {selectedMarkerId, stateStore} from "./stores.js";
    import CollectButtons from "./CollectButtons.svelte";
    import UncollectButton from "./UncollectButton.svelte";
    import StaticContent from "./StaticContent.svelte";
    // import {component} from "./Popup.svelte";

    // export let lastCollected;
    // export let isCollected;

    const {getMarker, collect, uncollect, noRespawn, lastCollected, collected} = getContext("marker");
    const marker = getMarker();

    const popup = getContext("popup")();

    const dispatch = createEventDispatcher();

    const ls = writable(localStorage.getItem(`${marker.options.id}.lastCollected`));
    const isCollectable = writable(new Date(Number(localStorage.getItem(`${marker.options.id}.lastCollected`))).getUTCDate() < new Date().getUTCDate())

    marker.setOpacity($ls ? 0.5 : 1)
    let updateKey = null;

    const {component, collectedState} = getContext("popup");

    const collectButtons = writable(true)

    const collectButtonsString = `<sl-button use:handleCollect variant="primary">Collect</sl-button><sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned" use:handleNoRespawn></sl-icon-button>`
    const uncollectButtonsString = `<sl-button on:click={() => uncollect();
            dispatch("collected", false)
            $ls = null;} variant="default">Remove</sl-button>`

    function handleCollect(node) {
        node.addEventListener("click", () => {
        collect()
            $ls = Date.now();
        $collectButtons = false;
        dispatch("collected", true)
            document.querySelector("#last-collected").innerHTML = `<sl-relative-time format="short" sync date="${new Date(Number($ls))}"></sl-relative-time>`;

            // document.querySelector(".spawn-buttons").innerHTML = `<sl-button id="uncollect" variant="default">Remove</sl-button>`;

            // if (marker.options.markerType === "respawning"){
            //     localStorage.setItem(`${marker.options.id}.lastCollected`, Date.now().toString())
            //     $lastCollected = localStorage.getItem(`${marker.options.id}.lastCollected`);
            // } else {
            //     localStorage.setItem(`${marker.options.id}.collected`, "true");
            //     $lastCollected = true;
            // }
            // marker.setOpacity(0.5);
        })
    }

    function handleNoRespawn(node) {
        node.addEventListener("click", () => {
            noRespawn();

        })
    }

    function onUncollect() {
        uncollect();
        updateKey = false;
        dispatch("collected", false)
        $ls = null;
        localStorage.removeItem(`${marker.options.id}.lastCollected`)
        // document.querySelector(".spawn-buttons").innerHTML = `<sl-button use:handleCollect variant="primary">Collect</sl-button><sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned"></sl-icon-button>`;
        // document.querySelector(".spawn-buttons").innerHTML = CollectButtons;
    }

    function onCollect() {
        collect()
        updateKey = true;
        $ls = Date.now();
        dispatch("collected", true)
        document.querySelector("#last-collected").innerHTML = `<sl-relative-time format="short" sync date="${new Date(Number($ls))}"></sl-relative-time>`;

        // document.querySelector(".spawn-buttons").innerHTML = `<sl-button id="uncollect" variant="default">Remove</sl-button>`;

    }

    function handleUncollect(node) {
        node.addEventListener("click", () => {
            $ls ? onUncollect() : onCollect();

            // uncollect();
            // dispatch("collected", false)
            // $ls = null;
            // localStorage.removeItem(`${marker.options.id}.lastCollected`)
            // document.querySelector(".spawn-buttons").innerHTML = `<sl-button variant="primary">Collect</sl-button><sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned"></sl-icon-button>`;

            // if (marker.options.markerType === "respawning"){
            //     localStorage.removeItem(`${marker.options.id}.lastCollected`)
            //     marker.options.lastCollected = null;
            // } else {
            //     localStorage.removeItem(`${marker.options.id}.collected`);
            //     marker.options.collected = false;
            // }
            //     // marker.setOpacity(1);

        })
    }
    $: $ls = localStorage.getItem(`${marker.options.id}.lastCollected`);

    const action = $ls ? handleUncollect : handleCollect
    $: text = $ls ? "Remove" : "Collect"
    $: updateKey = text
    $: console.log(updateKey)
</script>


<div class="container">
<strong>{marker.options.name}</strong>
<small class:no-desc={!marker.options.description}>Last collected: <span id="last-collected">{#if $lastCollected > 0}<sl-relative-time format="short" date={new Date(Number($ls))} sync></sl-relative-time>{:else}N/A{/if}</span></small>
{#if marker.options.description}
    <p>{marker.options.description}</p>
{/if}
<div class="spawn-buttons" on:collected={() => updateKey = Date.now()}>
    {#key $ls}
<!--    <svelte:component this={$ls ? UncollectButton : CollectButtons} />-->
    {#if $ls}
        <sl-button use:handleUncollect variant="default">Remove</sl-button>
    {:else}
        <sl-button use:handleCollect variant="primary">Collect</sl-button>
        <sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned" use:handleNoRespawn></sl-icon-button>
        {/if}

<!--        <slot name="collect" />-->
<!--    <slot />-->
        {/key}
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
        margin-bottom: 0.2em;
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

    .single-button sl-button {
        width: 100%;
    }

    p {
        margin: 0.5em 0 0.8em;
    }
</style>
