<script>
    import RespawningContent from "./RespawningContent.svelte";
    import {afterUpdate, beforeUpdate, getContext, onDestroy, onMount, setContext, tick} from "svelte";
    import {writable, derived} from "svelte/store";
    import OneTimeContent from "./OneTimeContent.svelte";
    import StaticContent from "./StaticContent.svelte";
    import UncollectButton from "./UncollectButton.svelte"
    import {selectedMarkerId, renderer} from "./stores.js"
    // import UncollectButton from "./UncollectButton.svelte";
    import {updatePopup} from "./updatePopup.js";
    import L from "leaflet";
    import CollectButtons from "./CollectButtons.svelte";
    import Sidepanel from "./Sidepanel.svelte";
    import PopupContent from "./PopupContent.svelte";
    // import {options} from "./Marker.svelte";

    const {getMarker, collect, uncollect, noRespawn, stateStore} = getContext("marker");
    const marker = getMarker();

    const {getMap} = getContext("map");

    setContext("popup", () => popup)

    let popupEl;
    let popup;
    let popupDescendant = true;
    let props;
    // export let marker;

    const popupContent = () =>  {
        switch(marker.options.markerType) {
            case "respawning":
                props = {isCollected: $isCollected}
                return RespawningContent;
            case "one-time":
                props = {};
                return OneTimeContent
            case "static":
                props = {};
                return StaticContent
        }
    }

    const component = writable(popupContent())

    function createPopup(node, options) {
        popup = L.popup();



        return {
            destroy() {
                popup.remove();
            },
            update(options) {
                popup.remove();
                map.on("popupclose", () => map.openPopup())
                popup.setContent(options.component);
                console.log("update")
                return popup;
            }
        }
    }

    onMount(() => {
        popup.setContent(popupEl);
        marker.bindPopup(popup, {
            minWidth: 180,
            maxWidth: 250
        });

        // Prevent popup content getting added directly to the DOM
        popupDescendant = (popupEl.closest(".leaflet-popup"));
    });


    // //
    // // function update() {
    // //     popup = L.popup()
    // //     $component = popupContent()
    // //     popup.setContent(UncollectButton)
    // // }
    //
    //
    // function handleCollect(node) {
    //     // node.addEventListener("click", () => {
    //         collect();
    //         marker = {...marker, options: { lastCollected: localStorage?.getItem(`${marker.options.id}.lastCollected`)}}
    //      console.log(popup)
    //         // document.querySelector("#last-collected").innerHTML = `<sl-relative-time format="short" sync date='${new Date(Number(localStorage[`${marker.options.id}.lastCollected`]))}'></sl-relative-time>`;
    //         // lastCollected = Number(localStorage[`${marker.options.id}.lastCollected`])
    //     // })
    // }
    //
    // function handleNoRespawn(node) {
    //     node.addEventListener("click", () => {
    //         noRespawn();
    //         marker = {...marker, options: { lastNegativeRespawn: localStorage?.getItem(`${marker.options.id}.lastNegativeRespawn`)}}
    //     })
    // }
    //
    // function handleUncollect(node) {
    //     node.addEventListener("click", () => {
    //         uncollect();
    //         marker = {...marker, options: { lastCollected: null}}
    //     })
    //
    // }
    //
    // // let date = new Date(Number($marker.options.lastCollected))
    //
    // $: date = localStorage.getItem(`${marker.options.id}.lastCollected`)
    //     // $: date ? $marker.setOpacity(0.5) : $marker.setOpacity(1)
    //
    // // $: $stateStore.lastCollected ? UncollectButton : CollectButtons
    // // $: isCollected = false;
    //
    // // function toggleCollected() {
    // //     isCollected = !isCollected;
    // // }
    const isCollected = writable(!!localStorage.getItem(`${marker.options.id}.lastCollected`));
    //
    // function newPopupContent() {
    //    return $isCollected ? new UncollectButton : new CollectButtons
    // }
    //
    // function onCollect() {
    //     marker.openPopup();
    //     collect();
    //     popupEl = popupContent();
    //     $component = UncollectButton
    //     marker.bindPopup(popup)
    // }
    // function onUncollect() {
    //     popup.openPopup()
    //     uncollect();
    //     popupEl = popupContent();
    //     $component = CollectButtons
    //     marker.bindPopup(popup)
    // }
    //
    // function handleCollectEvent() {
    //     switch (marker.options.markerType) {
    //
    //     }
    // }
</script>

{#if popupDescendant}
    {#key $isCollected}
    <div id="popup-container" use:createPopup bind:this={popupEl}>
<!--        <RespawningContent >-->
<!--            {#if $options.isCollected}-->
<!--                <div>-->

<!--                <UncollectButton on:collected={e => {$options.isCollected = e.detail; uncollect()}}  />-->
<!--                </div>-->
<!--                {:else }-->
<!--                <div>-->

<!--                <CollectButtons  on:collected={e => {$options.isCollected = e.detail; collect()}}/>-->
<!--                </div>-->
<!--                {/if}-->
<!--                </RespawningContent>-->

        <svelte:component this={$component} on:collected={() => $isCollected = !$isCollected}/>
<!--<slot />-->
        <!--{#if marker.options.markerType === "respawning"}-->
<!--            <RespawningContent />-->
            <!--{/if}-->

<!--        {#if $marker.options.markerType === "respawning"}-->
<!--           <strong>{$marker.options.name}</strong> -->
<!--            <small class:no-desc={!$marker.options.description}>Last collected: <span id="last-collected">{#if $marker.options.lastCollected > 0}<sl-relative-time format="short" date={date} sync></sl-relative-time>{:else}N/A{/if}</span></small>-->
<!--            {#if $marker.options.description}-->
<!--                <p>{$marker.options.description}</p>-->
<!--            {/if}-->
<!--            <div class="spawn-buttons">-->
<!--                {#if date}-->
<!--                    <sl-button use:handleUncollect variant="default">Remove</sl-button>-->
<!--                    {:else}-->
<!--                <sl-button use:handleCollect variant="primary">Collect</sl-button>-->
<!--                <sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned" use:handleNoRespawn></sl-icon-button>-->
<!--                    {/if}-->
<!--            </div>-->
<!--        {:else if $marker.options.markerType === "one-time"}-->
<!--            <strong class:no-desc={!$marker.options.description}>{$marker.options.name}</strong>-->
<!--            {#if $marker.options.description}-->
<!--                <p>{$marker.options.description}</p>-->
<!--            {/if}-->
<!--            <div class="single-button">-->
<!--                <sl-button use:handleCollect variant="primary">Collect</sl-button>-->
<!--            </div>-->
<!--        {:else if $marker.options.markerType === "static"}-->
<!--            <strong class:centered={!$marker.options.description}>{$marker.options.name}</strong>-->
<!--            {#if $marker.options.description}-->
<!--                <p class="static-desc">{$marker.options.description}</p>-->
<!--            {/if}-->
<!--        {/if}-->
    </div>
        {/key}
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

    .hidden {
        display: none;
    }
</style>

