<script>
    import {Tab, TabGroup} from "@skeletonlabs/skeleton";
    import FilterTree from "$lib/FilterTree.svelte";
    import {getContext, onMount} from "svelte";
    import Settings from "$lib/Settings.svelte";
    import Progress from "$lib/Progress.svelte";

    const map = getContext("map")();

    const tabs = ["filters", "progress", "settings"];

    let open = false;
    let activeTabIndex = 0;
    let sidebar;

    onMount(() => {
        for (const event of ["click", "dblclick", "scroll", "mousedown", "mousewheel", "touchstart"]) {
            sidebar.addEventListener(event, (e) => e.stopPropagation());
        }
    });
</script>

<aside
        bind:this={sidebar}
        class="sidebar bg-white dark:bg-surface-700 h-full shadow-md min-w-[290px] max-w-[450px] cursor-default select-none"
        class:open={open}
        class:closed={!open}
>
    <div class="sidebar-inner h-full w-full">
        <TabGroup class="h-full" justify="justify-center"
                  padding="py-3"
                  regionList="sticky top-0 right-1 bg-white dark:bg-surface-700"
                  regionPanel="bg-white h-full dark:bg-surface-700 overflow-y-auto" rounded="0">
            {#each tabs as tab, i}
                <Tab class="w-1/3" bind:group={activeTabIndex} name={tab} value={i}
                ><span>{tab.toUpperCase()}</span></Tab
                >
            {/each}
            <svelte:fragment slot="panel">
                <section class="md:text-base text-sm dark:bg-700 max-w-[390px] align-baseline">
                    {#if activeTabIndex === 0}
                        <FilterTree {map}/>
                    {:else if activeTabIndex === 1}
                        <Progress/>
                    {:else if activeTabIndex === 2}
                        <Settings/>
                    {/if}
                </section>
            </svelte:fragment>
        </TabGroup>
    </div>
    <div class="toggle-container bg-white dark:bg-surface-700">
        <button
                class="toggle-btn leaflet-control ring-surface-50"
                on:click={() => (open = !open)}
        />
    </div>
</aside>

<style>
    .sidebar {
        width: 400px;
        max-width: 85%;
        min-width: 340px;
        position: absolute;
        z-index: 5000;
    }

    section {
        scrollbar-gutter: stable;
        scrollbar-track-color: transparent;
        overflow-y: auto;
    }

    .open {
        animation: right 0.5s ease 0s 1 both;
    }

    .closed {
        animation: left 0.5s ease 0s 1 both;
    }

    .toggle-container {
        height: 48px;
        width: 24px;
        position: absolute;
        top: calc(50% - 24px);
        border-radius: 0 8px 8px 0;
        overflow-x: clip;
        clip-path: inset(-10px -10px -10px -1px);
        left: 100%;
        border-left: 1px solid rgba(79, 79, 79, 0.2);
    }

    .toggle-btn {
        cursor: pointer;
        z-index: 5000;
        height: 100%;
        width: 100%;
    }

    .toggle-btn::before {
        content: "";
        position: absolute;
        width: 24px;
        height: 48px;
        top: 0;
        left: -1px;
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50% 50%;
        opacity: 1;
    }

    .open .toggle-btn::before {
        transform: rotate(180deg);
    }

    .closed .toggle-btn::before {
        transform: rotate(0deg);
    }

    @keyframes left {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(calc(-100% - 1px));
        }
    }

    @keyframes right {
        0% {
            transform: translateX(calc(-100% - 1px));
        }
        100% {
            transform: translateX(0);
        }
    }

</style>
