<script>
    import {windowParams} from "$lib/stores.js";
    // Adapted from https://github.com/route360/Leaflet.CondensedAttribution
    export let emblem = "?";

    // Track width to keep
    let {width} = $windowParams;

    $: width = width;
</script>

<div class="leaflet-condensed-attribution text-black">
    <div class="attributes-body">
        {width >= 300 ? "Images " : ""}&copy;
        <a href="https://foxieventures.com">Foxie Ventures</a>
        |
        {#if width >= 300}Rendered with
        {/if}<a href="https://maptiler.com">MapTiler Engine</a>
    </div>
    <p class="emblem">{emblem}</p>
</div>

<style>
    /* Add styling for links inside the attribution body */
    :global(.leaflet-condensed-attribution a) {
        text-decoration: none;
    }

    :global(.leaflet-condensed-attribution a:hover) {
        text-decoration: underline;
    }

    .leaflet-condensed-attribution {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        border-radius: 20px;
        border: 6px solid rgb(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.8);
        margin: 10px;
        padding: 0;
        z-index: 1000;
        font-size: 0.75rem;
    }

    .emblem {
        text-align: center;
        margin: 0 auto;
        width: 28px;
        height: 28px;
        line-height: 28px;
        font-size: 1.2em;
        font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
    }

    .attributes-body {
        display: none;
        padding: 0 4px 0 12px;
        height: 28px;
        line-height: 28px;
        text-decoration: none;
    }

    .leaflet-condensed-attribution:hover {
        width: auto;
    }

    .leaflet-condensed-attribution:hover .attributes-body {
        display: inline-block;
    }

    @media (max-width: 450px) {
        .leaflet-condensed-attribution {
            border-radius: 1000px 0 0 50%;
            bottom: -1.2rem;
            right: -1rem;
            border-width: 3px;
        }

        .emblem {
            width: 1.7rem;
            padding-left: 8px;
        }

        .leaflet-condensed-attribution:hover {
            border-radius: 24px 0 0 0;
        }
    }
</style>
