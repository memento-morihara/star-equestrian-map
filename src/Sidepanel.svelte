<script>
    import {activeTabIndex, sidepanelOpen, shownFilters} from "./stores.js";
    export let panelPosition;
    export let darkMode;
    export let tabs;


    function handleClick(tabIndex) {
        activeTabIndex.set(tabIndex);
    }

    function toggleSidepanel() {
        sidepanelOpen.update(state => !state);
    }


</script>

    <div id="sidepanel" class="sidepanel {`sidepanel-${panelPosition}`}" class:opened={$sidepanelOpen} class:closed={!$sidepanelOpen}
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
                               data-tab-link={"tab-" + (i + 1)} on:click={() => handleClick(i + 1)}>{tab}</sl-button>
                        </li>
                    {/each}
                </ul>
            </nav>

            <div class="sidepanel-content-wrapper">
                    <div class="sidepanel-tab-content tab-content-centered" class:active={$activeTabIndex === 1}
                         data-tab-content={"tab-1"}>
                        <slot name="slot-1"/>
                    </div>

                    <div class="sidepanel-tab-content tab-content-centered" class:active={$activeTabIndex === 2}
                         data-tab-content={"tab-2"}>
                        <slot name="slot-2"/>
                    </div>
                    <div class="sidepanel-tab-content tab-content-centered" class:active={$activeTabIndex === 3}
                         data-tab-content={"tab-3"}>
                        <slot name="slot-3"/>
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

    .sidepanel {
        z-index: 3000;
        width: 400px;
        height: 100%;
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        background-color: #fff;
        box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
    }

    .sidepanel.closed {
        transform: translateX(-100%);
        animation: slide-left 0.5s ease;
    }

    .sidepanel.opened {
        transform: translateX(0%);
        animation: slide-right 0.5s ease;
    }

    .sidepanel-inner-wrapper {
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 1000;
    }

    .sidepanel-content-wrapper {
        position: relative;
        top: 0;
        width: 100%;
        height: calc(100% - 48px);
        overflow-y: auto;
        overflow-x: hidden;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar {
        width: 6px;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar-thumb {
        border-radius: 0;
        background: #848484;
    }

    .sidepanel-content-wrapper::-webkit-scrollbar-thumb:hover {
        background: #636363;
    }

    .sidepanel-tab-content {
        margin-top: 24px;
        display: none;
    }

    .sidepanel-tab-content.active {
        display: inherit;
    }

    .sidepanel-tabs-wrapper {
        position: relative;
        top: 0;
        height: 48px;
        width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 0 #d4d4d4;
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
    }


    .sidepanel-tab {
        flex-grow: 1;
        flex-basis: 0;
        align-self: stretch;
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

    .sidepanel-toggle-container {
        display: block;
        position: absolute;
        top: calc(50% - 24px);
        height: 48px;
        left: 400px;
    }


    .sidepanel-toggle-button {
        position: relative;
        overflow: visible;
        top: 0;
        left: 0;
        padding: 0;
        margin: 0;
        width: 24px;
        height: 48px;
        cursor: pointer;
        background-color: #fff;
        border: 0;
        border-left: 1px solid #d4d4d4;
        border-radius: 0 8px 8px 0;
        box-shadow: 0 1px 2px rgba(60, 64, 67, .3), 0 2px 6px 2px rgba(60, 64, 67, .15);
    }

    .sidepanel-toggle-button::before {
        content: '';
        position: absolute;
        width: 24px;
        height: 48px;
        top: 0;
        left: 0;
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234B5057%22%20class%3D%22bi%20bi-caret-right-fill%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22m12.14%208.753-5.482%204.796c-.646.566-1.658.106-1.658-.753V3.204a1%201%200%200%201%201.659-.753l5.48%204.796a1%201%200%200%201%200%201.506z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50% 50%;
    }

    .sidepanel .sidepanel-toggle-container.opened .sidepanel-toggle-button::before {
        transform: rotate(180deg);
    }

    .sidepanel .sidepanel-toggle-container.closed .sidepanel-toggle-button::before {
        transform: rotate(0deg);
    }

    @keyframes slide-left{0%{transform:translateX(0)} 100%{transform:translateX(-100%)}}

    @keyframes slide-right{0%{transform:translateX(-100%)}100%{transform:translateX(0)}}
</style>