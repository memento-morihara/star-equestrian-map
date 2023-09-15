<script>
    import Map from "$lib/Map.svelte";
    import Marker from "$lib/Marker.svelte";
    import Sidebar from "$lib/Sidebar.svelte";
    import CondensedAttribution from "$lib/CondensedAttribution.svelte";
    import Popup from "../lib/Popup.svelte";

    export let data;
</script>

<Sidebar {data} tabs={["Filters", "Progress", "Settings"]} />
<main>
    <Map>
        {#each data.locations as location}
            <Marker {location}>
                <Popup />
            </Marker>
        {/each}
    </Map>
</main>
<CondensedAttribution />

<style>
    @import "@shoelace-style/shoelace/dist/themes/light.css";

    :root {
        font-family: var(--sl-font-sans);
    }
</style>
