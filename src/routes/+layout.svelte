<script>
  import "../app.postcss";
  import { autoModeWatcher, initializeStores, LightSwitch, Modal } from "@skeletonlabs/skeleton";
  import { onMount, setContext } from "svelte";
  import { mapStore, settings, windowParams } from "$lib/stores.js";
  import { browser } from "$app/environment";

  let appWindow;

  let id;
  let screenWidth = windowParams.width;
  let screenHeight = windowParams.height;

  setContext("windowSize", { screenHeight, screenWidth, onResize });

  function onResize() {
    try {
      if (screenWidth < 300 || screenHeight < 300) {
        $mapStore && $mapStore.zoomControl.remove();
      } else {
        $mapStore.zoomControl.addTo($mapStore);
      }
    } catch (_) {
    }
  }

  onMount(async () => {
    if (browser) {
      $mapStore && onResize();

    }
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

<svelte:window
  bind:innerHeight={screenHeight}
  bind:innerWidth={screenWidth}
  on:resize={onResize}
/>
<svelte:head
>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
  <link href="/manifest.json" rel="manifest" />
  <meta
    content="#272727"
    media="(prefers-color-scheme: dark)"
    name="theme-color"
  />
  <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link href="/favicon.ico" rel="icon" />
</svelte:head>
{#if screenWidth > 300}
  <LightSwitch
    class="absolute right-3 top-3 lightswitch dark:bg-surface-800 z-[500]"
    ring="ring-1 ring-surface-400"
  />
{/if}
<Modal class="z-[50000]" />
<slot />
