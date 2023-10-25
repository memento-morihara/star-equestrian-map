<script>
    import {RecursiveTreeView,} from "@skeletonlabs/skeleton";
    import {categories, flatItems, flatNames, slugifyName} from "$lib/utils.js";
    import {getContext} from "svelte";

    export let map;
  export let counts;

  const groups = getContext("groups")();

  const nodes = categories.map((c) => ({
    id: c.name,
    content: c.label,
    children: c.items.map((item) => ({
      id: item,
      content: item
        .split("-")
        .map((name) => (name = name[0].toUpperCase() + name.slice(1)))
          .join(" ") + " (" + counts.find(count => slugifyName(count.name) === item)?.count + ")",
    })),
  }));

  const items = categories.flatMap(c => c.items);

  // Initialize all checkboxes as checked for now
  // Later this should come from local storage
  $: checkedNodes = flatItems;

  // Get all the checked items that aren't categories
  $: itemNodes = checkedNodes.filter(item => !flatNames.includes(item));
  $: itemNodes && toggleFeatureGroup();

  function toggleFeatureGroup() {
      // Find the items that are checked but aren't on the map and add them, and vice versa
      const diff = items.filter(item => itemNodes.includes(item) !== map.hasLayer(groups[item]));
      diff.forEach(item => map.hasLayer(groups[item]) ? groups[item].removeFrom(map) : groups[item].addTo(map));
  }
</script>

<RecursiveTreeView
  selection
  multiple
  relational
  bind:checkedNodes
  {nodes}
  regionSummary="text-lg"
  regionChildren="text-base"
/>

<!--<TreeView>-->
<!--    {#each nodes as category}-->
<!--<TreeViewItem children={category.children}>-->
<!--    {category.content}-->

<!--</TreeViewItem>-->
<!--        {/each}-->
<!--</TreeView>-->
