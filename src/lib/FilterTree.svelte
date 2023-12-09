<script>
    import {RecursiveTreeView} from "@skeletonlabs/skeleton";
    import {categories, flatNames, slugifyName} from "$lib/utils.js";
    import {getContext, onMount} from "svelte";
    import {filterStore, settings} from "$lib/stores.js";
    import {markerData} from "$lib/markerData.js";
    import CheckIcon from 'virtual:icons/bi/check-square';
    import SquareIcon from 'virtual:icons/bi/square';
    import {counts, countsWithBronco} from "$lib/db.js";
    import {writable} from "svelte/store";

    export let map;
    let nodes;
    let countText = writable({});

    const groups = getContext("groups")();

    function toggleBronco() {
        $settings.broncoEnabled ? groups.bronco.addTo(map) : groups.bronco.remove();

        for (const key of Object.keys($countText)) {
            $countText[key] = count(key);
            document.getElementById(slugifyName(key)).innerText = $settings.broncoEnabled ? $countText[key].enabled : $countText[key].disabled;
        }
    }

    $: count = (item) => ({
        enabled: countsWithBronco.find(i => i.name === item)?.count,
        disabled: counts.find(i => i.name === item).count
    });

    const getNodes = async () => await markerData().then(data => data.map(item => {
            return {
                id: item.name,
                content: item.label,
                children: item.items.map(i => {
                    $countText[i.name] = count(i.name);
                    return {
                        id: slugifyName(i.name),
                        content: `<p>${i.name} (<span id=${slugifyName(i.name)}>${$settings.broncoEnabled ? $countText[i.name].enabled : $countText[i.name].disabled}</span>)`,
                        lead: `<img src=${i.icon.createIcon().src} alt={i.name} height="24" width="24" />`,
                    }
                })
            }
        }
    ))

    const items = categories.flatMap(c => c.items);

    // Get all the checked items that aren't categories
    $: itemNodes = $filterStore.filter(item => !flatNames.includes(item));
    $: itemNodes && toggleFeatureGroup();

    function toggleFeatureGroup() {
        // Find the items that are checked but aren't on the map and add them, and vice versa
        const diff = items.filter(item => itemNodes.includes(item) !== map.hasLayer(groups[item]));
        diff.forEach(item => map.hasLayer(groups[item]) ? groups[item].removeFrom(map) : groups[item].addTo(map));
    }


    onMount(async () => {
        nodes = await getNodes();
    });

    function changeAllFilters() {
        if (areAllNodesChecked) {
            $filterStore = [];
        } else {
            $filterStore = nodes.flatMap(c => [...c.children.map(x => x.id), c.id]);
        }
    }

    $: areAllNodesChecked = nodes && ($filterStore.length === nodes.flatMap(c => [...c.children, c]).length);
</script>

<div class="chip-container flex flex-row-reverse dark:bg-surface-800 mb-0 w-full">
    <button class="chip -mt-3.5 absolute right-2.5 variant-primary"
            on:click={changeAllFilters}>
        {#if areAllNodesChecked}
            <CheckIcon class="text-[10px]"/>
        {:else}
            <SquareIcon class="text-[10px]"/>
        {/if}
        <span>{areAllNodesChecked ? "Uncheck all" : "Check all"}</span>
    </button>
</div>

<div class="h-full w-full">
    <RecursiveTreeView
            bind:checkedNodes={$filterStore}
            multiple
            {nodes}
            regionSummary="sm:text-lg hover:bg-transparent text-base max-w-[90%]"
            relational
            selection
    />

    <label class="sm:text-lg text-base ml-11 mt-4">
        <input bind:checked={$settings.broncoEnabled}
               class="checkbox mr-3.5"
               on:change={toggleBronco}
               type="checkbox"
        />
        Show Bronco items
    </label>
</div>
