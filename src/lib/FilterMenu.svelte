<script>
    import { markerData } from "$lib/markerData.js";

    export let data;
    console.log(data);
</script>

<sl-tree selection="multiple">
    {#await markerData() then markers}
        {#each markers as category}
            <sl-tree-item>
                {category.name}
                {#each category.items as item}
                    <sl-tree-item>
                        {item.name} ({data.counts.find(
                            (count) => count.name === item.name
                        ).count})</sl-tree-item
                    >
                {/each}
            </sl-tree-item>
        {/each}
    {/await}
</sl-tree>

<style>
    /* Hide selected item highlight for Shoelace tree items */
    ::part(item--selected) {
        background-color: transparent;
        border-inline-start-color: transparent;
    }

    sl-tree {
        margin: 0 var(--sl-spacing-large);
    }

    sl-tree-item::part(label) {
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-semibold);
        line-height: var(--sl-line-height-loose);
    }

    sl-tree-item sl-tree-item::part(label) {
        font-size: var(--sl-font-size-medium);
        font-weight: var(--sl-font-weight-regular);
    }

    sl-tree-item sl-tree-item::part(indentation) {
        width: var(--sl-spacing-x-large);
    }
</style>
