<script>
  import { ProgressBar, ProgressRadial } from "@skeletonlabs/skeleton";
  import { collectibleStores } from "$lib/stores.js";
  import { get } from "svelte/store";
  import { slugifyName } from "$lib/utils.js";
  import { getContext, onDestroy, onMount } from "svelte";
  import { page } from "$app/stores";

  let items = [];
  let collected = {};

  let unsubscribers = [];

  const { countsWithBronco } = JSON.parse($page.data.data);

  const windowSize = getContext("windowSize");

  $collectibleStores.forEach((item) => items.push(item));

  const groupBy = (prop, list) =>
    list.reduce(
      (groups, item) => ({
        ...groups,
        [item[prop]]: [...(groups[item[prop]] ?? []), item]
      }),
      {}
    );
  let grouped = groupBy("name", items);

  function getCollected() {
    Object.keys(grouped).forEach((key) => {
      const items = grouped[key].filter((item) => get(item.store)?.collected);
      collected[key] = items.length ?? 0;
    });
  }

  onMount(() => {
    // Put the unsubscribe method returned from subscribe into an array
    $collectibleStores.forEach((item) => {
      unsubscribers.push(item.store.subscribe(() => getCollected()));
    });
  });

  // Call the unsubscribe methods when component is unmounted
  onDestroy(() => {
    unsubscribers.forEach((s) => s());
  });

  $: percentCollected = (item) =>
    collected[item]
      ? collected[item] / countsWithBronco.find((c) => c.name === item)?.count
      : 0;

  $: $collectibleStores && getCollected();
</script>

<section class="sm:text-[1rem] text-[0.75rem] align-baseline px-2.5">
  <h2 class="h3 mt-2 mb-5">Progress</h2>
  <div class="mx-2 grid grid-cols-2 gap-4">
    {#each Object.keys(grouped) as item}
      {#if windowSize > 450}
        <div class="my-8 flex flex-col">
          <div class="flex justify-between">
            <div class="flex gap-2 text-base">
              <img
                class="-mt-0.5 mb-1"
                src="icons/collect/{slugifyName(item)}.webp"
                width="32"
                height="32"
                alt={item}
                title={item}
              />
              <p id={slugifyName(item)}>{item}s</p>
            </div>
            <p>
              {collected[item]}
              / {countsWithBronco.find((c) => c.name === item).count}
            </p>
          </div>
          <ProgressBar
            meter="bg-primary-500"
            track="dark:bg-surface-400 bg-surface-200"
            value={percentCollected(item) * 100}
            height="h-3"
            labelledby={slugifyName(item)}
          />
        </div>
      {:else}
        <div class="flex justify-center relative">
          <div class="absolute top-5">
            <div class="mx-auto flex flex-col items-center gap-0.5 sm: text-sm">
              <img
                height="32"
                width="32"
                src={`/icons/collect/${slugifyName(item)}.webp`}
                alt={item}
              />

              <span>
                {collected[item]}
                / {countsWithBronco.find((c) => c.name === item).count}
              </span>
            </div>
          </div>
          <ProgressRadial
            track="stroke-surface-300/100"
            meter="stroke-primary-500"
            value={percentCollected(item) * 100}
            width="w-24"
          ></ProgressRadial>
        </div>
      {/if}
    {/each}
  </div>
</section>
