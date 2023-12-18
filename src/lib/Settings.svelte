<script>
    import {allMarkers, initSettings, settings} from "$lib/stores.js";
    import {getContext, onMount} from "svelte";
    import {get} from "svelte/store";
    import {RangeSlider} from "@skeletonlabs/skeleton";
    import {inlineSvg, isChecked, isCollected} from "$lib/utils.js";
    import DataFileHandler from "$lib/DataFileHandler.svelte";

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
            (marker) => {
                if (isCollected(marker) > 0 || isChecked(marker) > 0) {
                    marker.setOpacity($settings.markerOpacity);
                }
            }
        );
    }

    function changeHoverSetting() {
        $allMarkers.forEach(marker => {
            marker.remove();
            marker.options.riseOnHover = $settings.hoverMarkers;
            marker.addTo(map);
        });
    }

    function revertSettings() {
        $settings = initSettings();
    }

    onMount(() => changeOpacity())

    $: disableCheckbox = !$settings.spiderfyMarkers
    $: $settings.markerOpacity && changeOpacity()
</script>

<div class="text-base align-baseline px-2.5 h-full flex flex-col justify-between">
    <div class="flex flex-col md:gap-12 gap-7">
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
                <label>
                    <input bind:checked={$settings.spiderfyMarkers} class="checkbox" type="checkbox"/>
                    <span class="ml-1">Spiderfy markers</span>
                </label>
                <label>
                    <input bind:checked={$settings.keepSpiderfied} class="checkbox"
                           class:!bg-surface-400={!$settings.spiderfyMarkers}
                           class:border-on-surface-500={!$settings.spiderfyMarkers} disabled={disableCheckbox}
                           type="checkbox"/>
                    <span class="ml-1">Keep spiderfied on button click</span>
                </label>
                <label>
                    <input bind:checked={$settings.hoverMarkers} class="checkbox" on:change={changeHoverSetting}
                           type="checkbox"/>
                    <span class="ml-1">Hovered marker on top</span>
                </label>
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
                    <RangeSlider accent="accent-primary-500 dark:accent-primary-500"
                                 bind:value={$settings.markerOpacity}
                                 class="w-2/3"
                                 disabled={$settings.hideCollectedMarkers} id="opacity"
                                 max="0.9" min="0.1" name="opacity" step="0.1"/>
                </div>

            </div>
            <button class="btn variant-ringed mt-5 self-start" on:click={revertSettings}>Reset to default</button>
        </div>

        <div>
            <h3 class="h4 mb-4">Import/Export Data</h3>
            <DataFileHandler/>
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
    </div>

    <footer class="w-full relative justify-items-center pt-7 pb-[80px] bottom-0">
        <a class="hover:underline"
           href="https://github.com/memento-morihara/star-equestrian-map">
            <div class="flex items-center gap-2 mx-auto w-1/3">
                {#await inlineSvg("github-mark.svg") then icon}
                    {@html `<div class="w-[32px] h-[32px] p-0 object-contain dark:fill-white">${icon}</div>`}
                {/await}
                <span class="dark:text-blue-400">GitHub</span>
            </div>
        </a>
    </footer>
</div>

