<script>
    import { selectedMarker } from "$lib/stores.js";
</script>

<div>
    <small>Last collected: N/A</small>
</div>
{#if $selectedMarker.options.description}
    <p>{$selectedMarker.options.description}</p>
{/if}
<div class="spawn-buttons">
    <sl-button variant="primary">Collect</sl-button>
    <sl-icon-button name="calendar-x" />
</div>

<style>
    p {
        margin: var(--sl-spacing-x-small) 0;
    }

    small {
        font-size: var(--sl-font-size-x-small);
    }

    sl-icon-button::part(base) {
        font-size: var(--sl-font-size-x-large);
        overflow: visible;
    }

    .spawn-buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: var(--sl-spacing-x-small);
    }
</style>
