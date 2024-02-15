<script>
  import { itemsCollected, points } from "$lib/stores.js";
</script>

<div class="text-center dark:border-l-surface-600 py-6 bg-white dark:bg-surface-700 grid grid-cols-2 mx-0 box-border mt-10">
  <div class="border-r-[1px]">
    <span class="text-gray-700-token h2 block">{$points}</span>
    <span class="text-gray-500-token">SP earned</span>
  </div>
  <div class="border-l-[1px] dark:border-l-surface-600">
    <span class="text-gray-700-token h2 block">{$itemsCollected}</span>
    <span class="text-gray-500-token">{$itemsCollected === 1 ? "item" : "items"} collected</span>
  </div>
</div>
