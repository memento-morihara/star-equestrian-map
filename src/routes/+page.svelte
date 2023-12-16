<script>
    import {LightSwitch} from "@skeletonlabs/skeleton";
    import Marker from "$lib/Marker.svelte";
    import Map from "$lib/Map.svelte";
    import Spiderfier from "$lib/Spiderfier.svelte";
    import CondensedAttribution from "$lib/CondensedAttribution.svelte";
    import Sidebar from "$lib/Sidebar.svelte";
    import {allMarkers, selectedMarker, settings} from "$lib/stores.js";
    import {onMount} from "svelte";
    import {broncoLocations, locations} from "$lib/db.js";

    let appWindow;
    export let data;


    // Check if it is running as a desktop app
    onMount(async () => {
        if (!window.__TAURI__) {
            return;
        }
        let tauriWindow = await import("@tauri-apps/api/window");
        appWindow = tauriWindow.appWindow;

        if (data.searchId) {
            $selectedMarker = $allMarkers.find(marker => marker.options.id === data.searchId);
            $selectedMarker && map.setView([$selectedMarker.lat, $selectedMarker.lng], 4);
        }
    });
    $: appWindow && appWindow?.setAlwaysOnTop($settings.keepOnTop);

</script>

<svelte:head>
    <title>Star Equestrian Map</title>
</svelte:head>

<LightSwitch
        class="absolute right-3 top-3 lightswitch dark:bg-surface-800 z-[500]"
        ring="ring-1 ring-surface-400"
/>
<Map {data}>
    <Sidebar/>
    <Spiderfier>
        {#each locations as location}
            <Marker
                    {location}
            />
        {/each}
        {#if $settings.broncoEnabled}
            {#each broncoLocations as location}
                <Marker {location} isBronco="true"/>
            {/each}
        {/if}
    </Spiderfier>
    <CondensedAttribution/>
</Map>
