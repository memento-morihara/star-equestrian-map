<script>
    import {RecursiveTreeView,} from "@skeletonlabs/skeleton";
    import {categories, flatNames, slugifyName} from "$lib/utils.js";
    import {getContext, onMount} from "svelte";
    import {filterStore} from "$lib/stores.js";
    import {markerData} from "$lib/markerData.js";
    import Icon from "@iconify/svelte";

    export let map;
    export let counts;
    let nodes;

    const groups = getContext("groups")();

    const getNodes = async () => await markerData().then(data => data.map(item => ({
        id: item.name,
        content: item.label,
        children: item.items.map(i => ({
            id: slugifyName(i.name),
            content: i.name + " (" + counts.find(count => count.name === i.name)?.count + ")",
            lead: `<img src=${i.icon.createIcon().src} alt={i.name} height="24" width="24" />`,
        }))
    })))

    const items = categories.flatMap(c => c.items);

    // Get all the checked items that aren't categories
    $: itemNodes = $filterStore.filter(item => !flatNames.includes(item));
    $: itemNodes && toggleFeatureGroup();

    function toggleFeatureGroup() {
        // Find the items that are checked but aren't on the map and add them, and vice versa
        const diff = items.filter(item => itemNodes.includes(item) !== map.hasLayer(groups[item]));
        diff.forEach(item => map.hasLayer(groups[item]) ? groups[item].removeFrom(map) : groups[item].addTo(map));
    }


    onMount(async () => nodes = await getNodes());

    function changeAllFilters() {
        if (areAllNodesChecked) {
            $filterStore = [];
        } else {
            $filterStore = nodes.flatMap(c => [...c.children.map(x => x.id), c.id]);
        }
    }

    $: areAllNodesChecked = nodes && ($filterStore.length === nodes.flatMap(c => [...c.children, c]).length)

</script>

<div class="chip-container flex flex-row-reverse dark:bg-surface-800 mb-0 w-full">
    <button class="chip -mt-3 absolute right-2.5 variant-primary" on:click={changeAllFilters}>
        <Icon icon={areAllNodesChecked ? "bi:check-square" : "bi:square"}/>&nbsp; {areAllNodesChecked ? "Uncheck all" : "Check all"}
    </button>
</div>

<div class="h-[90vh] max-w-[90%]">
    <RecursiveTreeView
            bind:checkedNodes={$filterStore}
            multiple
            {nodes}
            regionSummary="sm:text-lg hover:bg-transparent text-base max-w-[90%]"
            relational
            selection
    />
</div>
