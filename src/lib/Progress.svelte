<script>
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import {collectibleStores} from "$lib/stores.js";
    import {get} from "svelte/store";
    import {slugifyName} from "$lib/utils.js";
    import {onDestroy, onMount} from "svelte";

    let items = [];
    let arr = [];
    let collected = {};

    let unsubscribers = [];

    $collectibleStores.forEach(item => items.push(item))

    const groupBy = (prop, list) => list.reduce((groups, item) => ({
        ...groups,
        [item[prop]]: [...groups[item[prop]] ?? [], item]
    }), {});
    let grouped = groupBy("name", items);

    Object.keys(grouped).forEach(key => arr.push({[key]: [...grouped[key]]}));

    function getCollected() {
        Object.keys(grouped).forEach(key => {
            collected[key] = [...grouped[key].filter(item => get(item.store)?.collected)].length ?? 0
        });
    }

    onMount(() => {
        // Put the unsubscribe method returned from subscribe into an array
        $collectibleStores.forEach(item => unsubscribers.push(item.store.subscribe(() => getCollected())))
    });

    // Call the unsubscribe methods when component is unmounted
    onDestroy(() => unsubscribers.forEach(s => s()))

    $:  percentCollected = (item) => collected[item] ? collected[item] / grouped[item].length : 0;
</script>

<section class="text-base align-baseline px-2.5">
    <h2 class="h3">Progress</h2>
    <div class="mx-2">
        {#each Object.keys(grouped) as item}
            <div class="my-8 flex flex-col">
                <div class="flex justify-between">
                    <div class="flex gap-2">
                        <img class="-mt-0.5 mb-1" src="icons/collect/{slugifyName(item)}.webp" width="32" height="32"
                             alt={item} title={item}/>
                        <p id={slugifyName(item)} class="text-lg">{item}s</p>
                    </div>
                    <p class="text-lg">{collected[item]} / {grouped[item].length}</p>
                </div>
                <ProgressBar meter="bg-primary-500" track="dark:bg-surface-400 bg-surface-200"
                             value={percentCollected(item) * 100} height="h-3"
                             labelledby={slugifyName(item)}/>
            </div>
        {/each}
    </div>
    <div>
        <p>Note: Progress bars don't reflect the Bronco items toggle properly at the moment.</p>
    </div>
</section>
