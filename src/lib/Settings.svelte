<script>
    import {allMarkers, initSettings, settings} from "$lib/stores.js";
    import {getContext, onMount} from "svelte";
    import {get} from "svelte/store";
    import {modeCurrent, RangeSlider} from "@skeletonlabs/skeleton";
    import {isCollected} from "$lib/utils.js";

    const map = getContext("map")();

    let keepNonRespawning = true;

    function toggleHiddenMarkers(e) {
        e.target.checked
            ? $allMarkers.forEach((marker) => {
                if (isCollected(marker) >= 0) {
                    marker.remove();
                }
            })
            : $allMarkers.forEach((marker) => {
                marker.addTo(map);
                isCollected(marker) >= 0
                    ? marker.setOpacity($settings.markerOpacity)
                    : marker.setOpacity(1);
            });
    }

    function resetCollected() {
        $allMarkers.forEach(marker => {
            const store = get(marker.options.store);

            if (store?.lastCollected || store?.lastChecked) {
                marker.options.store.update(() => ({lastCollected: [null], lastChecked: [null]}));
                marker.setOpacity(1);
            } else if (store?.collected && !keepNonRespawning) {
                marker.options.store.update(() => ({collected: false}));
                marker.setOpacity(1);
            }
        })
    }

    function changeOpacity() {
        $allMarkers.forEach(
            (marker) =>
                isCollected(marker) >= 0 && marker.setOpacity($settings.markerOpacity)
        );
    }

    function revertSettings() {
        $settings = initSettings();
    }

    onMount(() => {
        changeOpacity()
    });

    $: $settings.markerOpacity && changeOpacity()
</script>

<section class="text-base align-baseline pl-2.5 flex flex-col gap-12">
    <div class="flex flex-col gap-1">
        <h2 class="h3 mb-3">Settings</h2>
        <div class="space-y-3 mx-2">
            {#if window.__TAURI__}
                <label>
                    <input
                            bind:checked={$settings.keepOnTop}
                            class="checkbox"
                            id="keep-on-top"
                            name="keep-on-top"
                            type="checkbox"
                    /><span class="ml-2">Keep window on top</span></label
                >
            {/if}
            <label
            ><input
                    bind:checked={$settings.closePopups}
                    class="checkbox"
                    id="close-popups"
                    name="close-popups"
                    type="checkbox"
            /><span class="ml-2">Close popups automatically on button click</span
            ></label
            >
            <label
            ><input
                    bind:checked={$settings.hideCollectedMarkers}
                    class="checkbox"
                    name="hide-collected"
                    on:change={(e) => toggleHiddenMarkers(e)}
                    type="checkbox"
            /><span class="ml-2">Hide collected items</span></label
            >
            <div class="flex flex-col space-y-2">
                <label class="mt-3" for="opacity"><span>Collected marker opacity</span></label>
                <RangeSlider accent="accent-primary-500 dark:accent-primary-500" bind:value={$settings.markerOpacity}
                             class="w-2/3"
                             disabled={$settings.hideCollectedMarkers} id="opacity"
                             max="0.9" min="0.1" name="opacity" step="0.1"/>
            </div>

        </div>
        <button class="btn variant-ringed mt-5 self-start" on:click={revertSettings}>Reset to default</button>
    </div>

    <hr/>

    <div class="flex flex-col gap-1">
        <h2 class="h4 mb-3">Reset collected items</h2>
        <div class="space-y-3 mx-2">
            <label
            ><input
                    bind:checked={keepNonRespawning}
                    class="checkbox"
                    id="save-collected"
                    name="save-collected"
                    type="checkbox"
            /><span class="ml-2">Preserve non-respawning items</span></label
            >
        </div>
        <button class="btn variant-filled-error mt-5 w-1/4" on:click={resetCollected}>Reset</button>
    </div>

    <footer class="absolute bottom-9 right-1/3 w-1/3">
        <a class="text-on-surface-token hover:underline" href="https://github.com/memento-morihara/star-equestrian-map">
            <div class="flex items-center gap-2">
                {#if $modeCurrent}
                    <img class="align-bottom" src="github-mark.svg" alt="GitHub logo" width="32" height="32"/>
                {:else}
                    <img class="align-bottom" src="github-mark-white.svg" alt="GitHub logo" width="32" height="32"/>
                {/if}
                <span>GitHub</span>
            </div>
        </a>
    </footer>
</section>
