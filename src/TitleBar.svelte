<script>
    import { slide } from "svelte/transition";
    import { appWindow } from "@tauri-apps/api/window";

    // Don't forget to set `tauri.conf.json`
    // startDragging
    // setDecorations
</script>

<div
    data-tauri-drag-region
    class="deadzone"
    on:pointerdown|preventDefault|stopPropagation={(e) => {
        appWindow.startDragging();
    }}
    transition:slide={{ duration: 2000 }}
>
    <button
        class="close"
        on:closeRequested={async (e) =>
            await confirm("Are you sure?").then((confirmed) =>
                confirmed ? appWindow.close() : e.preventDefault()
            )}>X</button
    >
</div>

<style>
    .close {
        position: absolute;
        right: 0;
        top: 0;
        display: none;
        height: 100%;
        width: 3rem;
        outline: none;
        border: none;
    }

    .deadzone:hover .close,
    .deadzone:active .close {
        display: block;
    }

    .close:hover {
        background-color: #ef3939;
        color: white;
    }
    .deadzone {
        height: 30px;
        cursor: pointer;
        position: absolute;
        z-index: 500;
        width: 100vw;
    }

    .deadzone:hover,
    .deadzone:active {
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            transparent 100%
        );
    }
</style>
