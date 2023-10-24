<script>
  import { Tab, TabGroup, LightSwitch } from "@skeletonlabs/skeleton";
  import FilterTree from "$lib/FilterTree.svelte";
  import { getContext } from "svelte";
  import {allMarkers, selectedMarker} from "$lib/stores.js";
  import PopupContent from "$lib/Popup.svelte";

  const map = getContext("map")();

  const tabs = ["filters", "progress", "settings"];

  let open = false;
  let activeTabIndex = 0;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<aside
  class="sidebar bg-white dark:bg-surface-800 shadow-md"
  class:open
  class:closed={!open}
  on:dblclick|stopPropagation
  on:mousedown|stopPropagation

>
  <div class="sidebar-inner w-full"   on:mousewheel|stopImmediatePropagation>
    <TabGroup class="tabs w-full py-0.5" justify="justify-evenly">
      {#each tabs as tab, i}
        <Tab bind:group={activeTabIndex} name={tab} value={i}
          ><span>{tab.toUpperCase()}</span></Tab
        >
      {/each}
      <svelte:fragment slot="panel">
        <div class="content">
          {#if activeTabIndex === 0}
            <FilterTree {map} />
          {:else if activeTabIndex === 1}
            Progress
          {:else if activeTabIndex === 2}
            Settings

          {/if}
        </div>

      </svelte:fragment>
    </TabGroup>
  </div>
  <div class="toggle-container bg-white dark:bg-surface-800 shadow-md">
    <button
      class="toggle-btn leaflet-control z-50"
      on:click={() => (open = !open)}
    />
  </div>
</aside>

<style>
  .sidebar {
    width: 400px;
    display: flex;
    position: absolute;
    left: 0;
    z-index: 5000;
    height: 100%;
    /*box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),*/
    /*  0 2px 6px 2px rgba(60, 64, 67, 0.15);*/
  }

  .sidebar-inner {
    overflow-y: auto;
  }

  .open {
    left: 0;
  }

  .closed {
    left: -400px;
  }

  .toggle-container {
    height: 48px;
    width: 24px;
    position: absolute;
    top: calc(50% - 24px);
    left: 100%;
    border-radius: 0 8px 8px 0;
    /*box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),*/
    /*  0 2px 6px 2px rgba(60, 64, 67, 0.15);*/
    overflow-x: hidden;
    border-left: 1px solid #d4d4d4;
    clip-path: inset(-10px -10px -10px 0);
    margin: 0 0 0 -1px;
  }

  :global(.dark .toggle-container) {
    border-left: 1px solid #3e3e3e !important;
  }

  .toggle-btn {
    cursor: pointer;
    z-index: inherit;
    box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
  }

  .toggle-btn::before {
    content: "";
    position: absolute;
    width: 24px;
    height: 48px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E")
      no-repeat 50% 50%;
    opacity: 1;
  }

  .sidebar.open .toggle-btn::before {
    transform: rotate(180deg);
  }

  .sidebar.closed .toggle-btn::before {
    transform: rotate(0deg);
  }

  :global(.lightswitch) {
    z-index: 10000;
  }
</style>
