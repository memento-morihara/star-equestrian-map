<script>
    import {
        activeTabIndex,
        allMarkers,
        autoClosePopups,
        formatName,
        items,
        shownFilters,
        shownMarkers,
        sidepanelOpen
    } from "./stores.js";
    import {counts} from "../locations.js";
    import Progress from "./Progress.svelte";
    import {getContext} from "svelte";

    // Props
    export let panelPosition;
    export let darkMode;
    export let tabs;

    const map = getContext("map")();
    function handleClick(tabIndex) {
        $activeTabIndex = tabIndex;
    }

    function toggleSidepanel() {
        sidepanelOpen.update(state => !state);
    }

    function handleFilterChange(e) {
        $shownFilters = e.detail.selection.filter(i => !["chests", "food", "resources", "collectibles", "other"].includes(i.dataset.value)).map(x => x.dataset.value);
        localStorage.setItem("shownItems", $shownFilters)
    }

    const treeItems = document.querySelectorAll("sl-tree-item[data-value]")
    $: {
        $shownFilters.forEach(item => {
            treeItems.forEach(c => {
                if (c.getAttribute("data-value") === item) {
                    c.setAttribute("selected", "true");
                }
            })
        });
    }

    function reset() {
        const checkboxes = document.querySelectorAll("sl-checkbox");
        const keys = $allMarkers.map(marker => marker.options.id)
        if (!checkboxes[0].checked && !checkboxes[1].checked) {
            localStorage.clear();
        }
        if (!checkboxes[0].checked) {
            keys.forEach(key => localStorage.removeItem(`${key}.collected`));
        }
        if (!checkboxes[1].checked) {
            localStorage.removeItem("shownItems")
        }
        keys.forEach(key => localStorage.removeItem(`${key}.lastCollected`));
        window.location.reload(true);
    }

    function hideCollected(e) {
        $shownMarkers.forEach(marker => marker.options.collected && e.target.checked ? marker.remove() : !map.hasLayer(marker) && marker.addTo(map))
    }

    function setAutoClose(e) {
        e.target.checked ? localStorage.setItem("autoClosePopups", "true") : localStorage.removeItem("autoClosePopups");
        $autoClosePopups = e.target.checked;
    }

</script>

<div on:dblclick|stopPropagation on:mousewheel|stopPropagation id="sidepanel"
     class="sidepanel {`sidepanel-${panelPosition}`}"
     class:opened={$sidepanelOpen} class:closed={!$sidepanelOpen}
     class:sidepanel-dark={darkMode}>
    <div class="sidepanel-toggle-container" class:opened={$sidepanelOpen} class:closed={!$sidepanelOpen}>
        <button class="sidepanel-toggle-button" on:click={() => toggleSidepanel()} type="button"
                aria-label="toggle side panel"></button>
    </div>
    <div class="sidepanel-inner-wrapper">
        <nav class="sidepanel-tabs-wrapper">
            <ul class="sidepanel-tabs sidepanel-tabs-top">
                {#each tabs as tab, i}
                    <li class="sidepanel-tab">
                        <sl-button variant="text" class="sidepanel-tab-link" class:active={$activeTabIndex === (i + 1)}
                                   data-tab-link={"tab-" + (i + 1)}
                                   on:click={() => handleClick(i + 1)}>{tab}</sl-button>
                    </li>
                {/each}
            </ul>
        </nav>

        <div class="sidepanel-content-wrapper">
            <div class="sidepanel-content">

                <div class="sidepanel-tab-content" class:active={$activeTabIndex === 1}
                     data-tab-content={"tab-1"}>
                    <h3>Category</h3>
                    <sl-tree selection="multiple" on:sl-selection-change={e => handleFilterChange(e)}>
                        {#each items as item}
                            <sl-tree-item data-value="{item.parent.toLowerCase()}">
                                <span class="parent">{item.parent}</span>
                                {#each item.children as child}
                                    {#if $shownFilters.includes(child)}
                                        <sl-tree-item data-value="{child}" selected class="child">{formatName(child)}
                                            ({counts.find(c => c.name === formatName(child)).count})
                                        </sl-tree-item>
                                    {:else}
                                        <sl-tree-item data-value="{child}" class="child">{formatName(child)}
                                            ({counts.find(c => c.name === formatName(child)).count})
                                        </sl-tree-item>
                                    {/if}
                                {/each}
                            </sl-tree-item>
                        {/each}
                    </sl-tree>

                    <h3>Stat</h3>
                    <div class="filter-container">

                        {#each ["agility", "speed", "stamina", "jump", "acceleration"] as stat}
                            <sl-checkbox>{formatName(stat)}</sl-checkbox>
                        {/each}
                    </div>
                </div>

                <div class="sidepanel-tab-content tab-content-centered" class:active={$activeTabIndex === 2}
                     data-tab-content={"tab-2"}>
                    <Progress/>
                    <!--                    <table>-->
                    <!--                        <thead>-->
                    <!--                        <tr>-->
                    <!--                            <th>Item</th>-->
                    <!--                            <th>Collected</th>-->
                    <!--                            <th>Last Negative Respawn</th>-->
                    <!--                        </tr>-->
                    <!--                        </thead>-->
                    <!--                        <tbody>-->
                    <!--                        {#each $shownMarkers as marker}-->
                    <!--                            <tr>-->
                    <!--                                <td>{marker.options.name}</td>-->
                    <!--                                <td>{marker.options.lastCollected ? new Date(Number(marker.options.lastCollected)).toLocaleDateString() : "N/A"}</td>-->
                    <!--                                <td>N/A</td>-->
                    <!--                            </tr>-->
                    <!--                        {/each}-->
                    <!--                        </tbody>-->
                    <!--                    </table>-->
                </div>
                <div class="sidepanel-tab-content tab-content-centered" class:active={$activeTabIndex === 3}
                     data-tab-content={"tab-3"}>
                    <div class="settings">
                        <h2>Settings</h2>

                        <sl-checkbox on:sl-change={e => setAutoClose(e)}>Close popups automatically on button click
                        </sl-checkbox>
                        <sl-checkbox on:sl-change={(e) => hideCollected(e)}>Hide collected items</sl-checkbox>

                        <h2>Reset collected items</h2>
                        <p>In case of emergency, reset all of your collected items data.</p>
                        <p>Your browser will refresh automatically.</p>
                        <sl-checkbox checked>Preserve non-respawning items</sl-checkbox>
                        <sl-checkbox checked>Preserve filter selections</sl-checkbox>
                        <sl-button on:click={reset} variant="danger">Reset</sl-button>

                        <!--                        <sl-button on:click={() => $dialog = !$dialog}>View Data</sl-button>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    /* Modified to use CSS variable for theming */
    :root {
        /*--accent-color: rgb(139, 55, 168)*/
        --accent-color: var(--sl-color-primary-700);
    }

    p {
        font-size: 1rem;
    }

    .sidepanel {
        width: 400px;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        border: 0;
        position: absolute;
        background-color: #ffffff;
        box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
        z-index: 3000;
        cursor: default;
        left: 0;
        transform: translateX(-100%);
    }

    @media screen and (max-width: 450px) {
        .sidepanel {
            width: calc(100% - 56px);
        }
    }

    .sidepanel.opened {
        animation: slide-right 0.5s ease 0s 1 both;
    }

    .sidepanel.closed {
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

    .sidepanel-tab-content {
        color: inherit;
        display: none;
    }

    .sidepanel-content-wrapper .sidepanel-content .sidepanel-tab-content.active {
        display: block;
        animation: fade-in 0.36s ease-out;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar {
        width: 6px;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar-thumb {
        background: #636363;
        border-radius: 0;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar-thumb:hover {
        background: #383838;
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

    .sidepanel-toggle-container {
        display: block;
        position: absolute;
        top: calc(50% - 24px);
        left: 100%;
        right: 0;
        width: 24px;
        height: 48px;
        z-index: -1;
    }

    .sidepanel-toggle-button {
        position: absolute;
        overflow: visible;
        padding: 0;
        margin: 0;
        width: 24px;
        height: 48px;
        cursor: pointer;
        background-color: #ffffff;
        border: 0;
        border-left: 1px solid #d4d4d4;
        border-radius: 0 8px 8px 0;
        box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
    }

    .sidepanel-toggle-button::before {
        content: "";
        position: absolute;
        width: 24px;
        height: 48px;
        top: 0;
        left: 0;
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50% 50%;
        opacity: 1;
    }

    .sidepanel-toggle-button:focus {
        outline: none;
    }

    .sidepanel.opened .sidepanel-toggle-container .sidepanel-toggle-button::before {
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50% 50%;
        transform: rotate(180deg);
    }

    .sidepanel .sidepanel-toggle-container .sidepanel-toggle-button::before,
    .sidepanel.closed .sidepanel-toggle-container .sidepanel-toggle-button::before {
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50% 50%;
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
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    sl-tree {
        margin-top: 1em;
        font-size: 1.3em;
    }

    .parent {
        font-size: 1.4em;
        font-weight: 500;
        line-height: 2em;
    }

    .child:last-of-type {
        margin-bottom: 0.3em;
    }

    .child {
        margin-left: 0.3rem;
    }

    .filter-container {
        display: flex;
        flex-direction: column;
        margin-left: 3.3rem;
        line-height: 3rem;
    }

    .filter-container sl-checkbox::part(base) {
        font-size: 1.5rem;
        display: block;
    }

    /* Hide selected item highlight for Shoelace tree items */
    ::part(item--selected) {
        background-color: transparent;
        border-inline-start-color: transparent;
    }

    .settings {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 1em;
        font-size: 1.3em;
        line-height: 1.2;
        margin-left: 1em;
    }

    .settings h2 {
        margin-bottom: 0;
    }

    .settings p {
        margin: 0;
    }

    table {
        text-align: left;
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
    }

    td, th {
        padding: 4px 20px;
        border-bottom: 1px solid #eee;
    }

    h3 {
        text-transform: uppercase;
    }

    h2 {
        font-size: 1.63rem;
        text-align: center;
    }

</style>