<script>
    import Map from "./src/Map.svelte";
    import MarkerController from "./src/MarkerController.svelte";
    import Sidepanel from "./src/Sidepanel.svelte";
    import Spiderfier from "./src/Spiderfier.svelte";
    import CondensedAttribution from "./src/CondensedAttribution.svelte";

    const attribution =
        'Images &copy; <a href="https://www.foxieventures.com">Foxie Ventures</a> | <a href="https://www.maptiler.com/engine/">Rendered with MapTiler Engine</a>, non-commercial use only';
</script>

<main>
    <Map>
        <Spiderfier>
            <MarkerController />
        </Spiderfier>
        <Sidepanel
            panelPosition="left"
            darkMode={false}
            tabs={["Filter", "Progress", "Settings"]}
        />
        <CondensedAttribution fullText={attribution} />
    </Map>
</main>

<style>
    @import "@shoelace-style/shoelace/dist/themes/light.css";

    :global(body) {
        margin: 0;
    }

    :root {
        /* Changes the primary theme color to purple using primitives */
        --sl-color-primary-50: var(--sl-color-purple-50);
        --sl-color-primary-100: var(--sl-color-purple-100);
        --sl-color-primary-200: var(--sl-color-purple-200);
        --sl-color-primary-300: var(--sl-color-purple-300);
        --sl-color-primary-400: var(--sl-color-purple-400);
        --sl-color-primary-500: var(--sl-color-purple-500);
        --sl-color-primary-600: var(--sl-color-purple-600);
        --sl-color-primary-700: var(--sl-color-purple-700);
        --sl-color-primary-800: var(--sl-color-purple-800);
        --sl-color-primary-900: var(--sl-color-purple-900);
        --sl-color-primary-950: var(--sl-color-purple-950);
    }
</style>
