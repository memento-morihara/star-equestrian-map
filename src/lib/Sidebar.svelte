<script>
    import { activeFilters } from "$lib/stores.js";
    import { onMount, setContext } from "svelte";
    import FilterMenu from "$lib/FilterMenu.svelte";

    const treeItems = $activeFilters.map((category) => ({
        title: category.name,
        children: category.items.map((item) => ({
            title: item.name,
        })),
    }));

    export let tabs;
    export let data;

    $: open = false;

    // BUG: If activeTabIndex is set to 0, the filter menu doesn't render correctly
    // until you switch to another tab and back
    // So automate the process in the background for now
    $: activeTabIndex = 1;
    onMount(() => (activeTabIndex = 0));
</script>

<aside class="sidebar" class:open class:closed={!open}>
    <div class="toggle-container">
        <!-- Toggle Container -->
        <button
            type="button"
            class="toggle-btn"
            on:click={() => (open = !open)}
        />
    </div>
    <div class="sidepanel-inner-wrapper">
        <!-- Inner Wrapper -->
        <nav class="sidepanel-tabs-wrapper">
            <!-- Tabs Wrapper -->
            <ul class="sidepanel-tabs sidepanel-tabs-top">
                {#each tabs as tab, i}
                    <li class="sidepanel-tab">
                        <sl-button
                            class="sidepanel-tab-link"
                            class:active={activeTabIndex === i}
                            variant="text"
                            data-tab-link={"tab-" + i + 1}
                            on:click={() => (activeTabIndex = i)}
                            >{tab}</sl-button
                        >
                    </li>
                {/each}
            </ul>
        </nav>
        <div class="sidepanel-content-wrapper">
            <!-- Sidepanel Content Wrapper -->
            <div class="sidepanel-content">
                <!-- Sidepanel Content-->
                {#if activeTabIndex === 0}
                    <!-- Tab Content -->
                    <section
                        class="sidepanel-tab-content"
                        class:active={activeTabIndex === 0}
                        data-tab-content="tab-1"
                    >
                        <div>
                            <FilterMenu {data} />
                        </div>
                    </section>
                {:else if activeTabIndex === 1}
                    <section
                        class="sidepanel-tab-content"
                        class:active={activeTabIndex === 1}
                        data-tab-content="tab-2"
                    >
                        Tab 2
                    </section>
                {:else if activeTabIndex === 2}
                    <section
                        class="sidepanel-tab-content"
                        class:active={activeTabIndex === 2}
                        data-tab-content="tab-3"
                    />
                {/if}
            </div>
        </div>
    </div>
</aside>

<style>
    .sidebar {
        width: 400px;
        max-width: 87%;
        height: 100%;
        background-color: white;
        position: absolute;
        z-index: 3000;
    }

    .sidebar.open {
        left: -400px;
        animation: slide-right 0.5s ease 0s 1 both;
    }

    .sidebar.closed {
        left: 0;
        animation: slide-left 0.5s ease 0s 1 both;
    }

    .sidepanel-inner-wrapper {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 1000;
        display: flex;
        flex-direction: column;
    }

    .sidepanel-content-wrapper {
        height: 100%;
        width: 100%;
        color: #191a1d;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .sidepanel-content-wrapper .sidepanel-content {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .sidepanel-content-wrapper
        .sidepanel-content
        .sidepanel-tab-content.active {
        display: block;
        animation: fade-in 0.36s ease-out;
    }

    .toggle-container {
        display: block;
        position: absolute;
        width: 24px;
        height: 48px;
        background-color: white;
        top: calc(50% - 24px);
        left: 100%;
        z-index: 1000;
        overflow: show;
        border-radius: 0 8px 8px 0;
        border-left: 1px solid #d4d4d4;
    }

    .toggle-btn {
        border-radius: 0 8px 8px 0;
        position: absolute;
        background-color: white;
        border: 0;
        width: 24px;
        height: 48px;
        box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
            0 2px 6px 2px rgba(60, 64, 67, 0.15);
        cursor: pointer;
        overflow: hidden;
        z-index: inherit;
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

    @keyframes slide-left {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    @keyframes slide-right {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(100%);
        }
    }

    .sidepanel-tabs-wrapper {
        height: 48px;
        width: 100%;
        background-color: #ffffff;
        display: flex;
        align-items: center;
    }

    .sidepanel-tabs {
        list-style-type: none;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 100%;
        width: 100%;
        top: 0;
        box-shadow: inset 0 -1px 0 #d4d4d4;
    }

    .sidepanel-tabs-wrapper .sidepanel-tabs .sidepanel-tab {
        flex-grow: 1;
        flex-basis: 0;
        align-self: stretch;
    }

    @media screen and (max-width: 230px) {
        .sidepanel-tabs-wrapper .sidepanel-tabs {
            overflow: scroll;
        }
    }

    sl-button.sidepanel-tab-link {
        width: 100%;
        height: 100%;
    }

    sl-button.sidepanel-tab-link::part(base) {
        text-align: center;
        display: flex;
        align-items: center;
        height: 100%;
        line-height: 1.7;
        font-size: 14px;
        font-weight: 500;
        color: #4b5057;
        padding-left: 8px;
        padding-right: 8px;
        border: 0;
        border-radius: 0;
        text-decoration: none;
        text-transform: uppercase;
        border-bottom: 2px solid transparent;
        transition: border-color 0.12s ease-out, color 0.12s ease-out;
        cursor: pointer;
    }

    .sidepanel-tab-link::part(base):hover {
        color: #191a1d;
        border-bottom: 2px solid rgba(175, 184, 193, 0.4);
    }

    .sidepanel-tab-link.active::part(base) {
        color: var(--accent-color);
        border-bottom-color: var(--accent-color);
    }

    .sidepanel-tab-content {
        position: relative;
        margin: 1rem;
    }
</style>
