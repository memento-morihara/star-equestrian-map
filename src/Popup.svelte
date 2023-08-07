<script>
    import {getContext, onMount} from "svelte";
    import {writable} from "svelte/store";
    import {selectedMarkerId} from "./stores.js";

    const {getMarker, collectMarker} = getContext(L.Marker);
    const marker = getMarker();

    let popupEl;
    let popup;
    let popupDescendant = true;

    function createPopup() {
        popup = L.popup()
    }


    onMount(() => {
        popup.setContent(popupEl);
        marker.bindPopup(popup, {
            minWidth: 180,
            maxWidth: 250
        });
        // Prevent popup content getting added directly to the DOM
        popupDescendant = (popupEl.closest(".leaflet-popup"));
    })

    function handleClick(node) {
        node.addEventListener("click", () => {
        collectMarker()
        document.querySelector("#last-collected").innerHTML = `<sl-relative-time format="short" date='${new Date(Number(localStorage[`${marker.options.id}.lastCollected`]))}'></sl-relative-time>`
    })
    }
</script>

{#if popupDescendant}
    <div class="container" use:createPopup bind:this={popupEl}>
        {#if marker.options.markerType === "respawning"}
            <strong>{marker.options.name}</strong>
            <small class:no-desc={!marker.options.description}>Last
                collected: <span id="last-collected">{#if marker.options.lastCollected}<sl-relative-time format="short" date={new Date(Number(marker.options.lastCollected))} sync></sl-relative-time>{:else}N/A{/if}</span></small>
            {#if marker.options.description}
                <p>{marker.options.description}</p>
            {/if}
            <div class="spawn-buttons">
                <sl-button use:handleClick variant="primary">Collect</sl-button>
                <sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned"></sl-icon-button>
            </div>
        {:else if marker.options.markerType === "one-time"}
            <strong class:no-desc={!marker.options.description}>{marker.options.name}</strong>
            {#if marker.options.description}
                <p>{marker.options.description}</p>
            {/if}
            <div class="single-button">
                <sl-button use:handleClick variant="primary">Collect</sl-button>
            </div>
        {:else if marker.options.markerType === "static"}
            <strong class:centered={!marker.options.description}>{marker.options.name}</strong>
            {#if marker.options.description}
                <p class="static-desc">{marker.options.description}</p>
            {/if}
        {/if}
    </div>
{/if}

<style>
    .container {
        font-size: 1.14em;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    small {
        margin: 0.3em 0;
    }

    sl-icon-button {
        font-size: 1.8em;
        padding: 0;
    }

    .centered {
        margin: 0 auto;
    }

    .spawn-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 0.2em auto 0;
        width: 100%;
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

    .static-desc {
        margin-bottom: 0.3em;
    }

    strong {
        font-size: 1.3em;
        vertical-align: middle;
        margin-bottom: 0.2em;
    }

    .no-desc {
        margin: 0 0 0.34em;
    }

</style>