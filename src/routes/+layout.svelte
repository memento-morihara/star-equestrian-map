<script>
    import "../app.postcss";
    import {autoModeWatcher, initializeStores, LightSwitch, Modal} from "@skeletonlabs/skeleton";
    import {page} from "$app/stores";
    import {onMount, setContext} from "svelte";
    import {mapStore, settings} from "$lib/stores.js";

    let appWindow;


    let id;
    let screenWidth;
    let screenHeight;

    setContext("windowSize", {screenHeight, screenWidth});

    function onResize() {
        if (screenWidth < 450) {
            $mapStore && $mapStore.zoomControl.remove();
        } else {
            $mapStore.zoomControl.addTo($mapStore);
        }
    }

    onMount(async () => {

        // Check if it is running as a desktop app
        if (!window.__TAURI__) {
            return;
        }
        let tauriWindow = await import("@tauri-apps/api/window");
        appWindow = tauriWindow.appWindow;
    });

    $: appWindow && appWindow?.setAlwaysOnTop($settings.keepOnTop);
    initializeStores();


</script>
<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} on:resize={onResize}></svelte:window>
<svelte:head
>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
    <link href="/manifest.json" rel="manifest"/>
    <meta content="#272727" media="(prefers-color-scheme:dark)" name="theme-color"/>
    <link href="/apple-touch-icon-precomposed.png" rel="apple-touch-icon">
    <link href="/favicon.png" rel="icon"/>
</svelte:head
>
{#if screenWidth > 450}
    <LightSwitch
            class="absolute right-3 top-3 lightswitch dark:bg-surface-800 z-[500]"
            ring="ring-1 ring-surface-400"
    />
{/if}
<Modal class="z-[10000]"/>
<slot/>
