<script>
    import Map from "$lib/Map.svelte";
    import Marker from "$lib/Marker.svelte";
    import Sidebar from "$lib/Sidebar.svelte";
    import CondensedAttribution from "$lib/CondensedAttribution.svelte";

    export let data;
    console.log(data);
</script>

<Sidebar {data} tabs={["Filters", "Progress", "Settings"]} />
<main>
    <Map>
        {#each data.locations as location}
            <Marker {location} />
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
