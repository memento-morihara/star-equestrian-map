<script>
    import {ProgressBar} from "@skeletonlabs/skeleton";
    import {allMarkers} from "$lib/stores.js";
    import {get} from "svelte/store";
    import {slugifyName} from "$lib/utils.js";

    let items = [];
    let arr = [];
    let collected = {};

    items.forEach(item => console.log(item.store))

    $allMarkers.forEach(marker => {
        if (marker.options.markerType === "one-time" && !["Legendary Chest", "Quest Item"].includes(marker.options.name)) {
            // Bring the name property to the root to reduce by
            items.push({store: get(marker.options.store) ?? false, name: marker.options.name});
        }
    });

    const groupBy = (prop, list) => list.reduce((groups, item) => ({
        ...groups,
        [item[prop]]: [...groups[item[prop]] ?? [], item]
    }), {});
    let grouped = groupBy("name", items);

    Object.keys(grouped).forEach(key => arr.push({[key]: [...grouped[key]]}));
    Object.keys(grouped).forEach(key => {
        collected[key] = [...grouped[key].filter(item => item.store?.collected)].length ?? 0
    });

    const percentCollected = (item) => collected[item] ? collected[item] / grouped[item].length : 0;
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
                <ProgressBar meter="bg-primary-500" value={percentCollected(item) * 100} height="h-3"
                             labelledby={slugifyName(item)}/>
            </div>
        {/each}
    </div>
</section>
