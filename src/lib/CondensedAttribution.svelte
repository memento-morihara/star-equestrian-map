<script>
    // Adapted from https://github.com/route360/Leaflet.CondensedAttribution
    export let emblem = "?";
    export let fullText = `Images &copy; <a href="https://foxieventures.com">Foxie Ventures</a> | Rendered with <a href="https://maptiler.com">MapTiler Engine</a>`;
</script>

<div class="leaflet-condensed-attribution">
    <div class="attributes-body">{@html fullText}</div>
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
    }

    .emblem {
        text-align: center;
        margin: 0 auto;
        width: 28px;
        height: 28px;
        line-height: 28px;
        font-size: 1.2em;
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
</style>
