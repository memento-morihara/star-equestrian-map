<script>
import {shownMarkers, dialog} from "./stores.js";
import {onMount} from "svelte";

let modal;

onMount(() => {
    modal = document.querySelector("sl-dialog");
})
</script>

<sl-dialog >
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Last Collected</th>
            <th>Last Negative Respawn</th>
        </tr>
        </thead>
        <tbody>
        {#each $shownMarkers as marker}
            <tr>
                <td>{marker.options.id}</td>
                <td>{marker.options.name}</td>
                <td>{marker.options.lastCollected ? new Date(Number(marker.options.lastCollected)).toLocaleDateString() : "N/A"}</td>
                <td>N/A</td>
            </tr>
        {/each}
        </tbody>
    </table>
</sl-dialog>


<style>

    sl-dialog {
        position: absolute;
        z-index: 99999;
    }
</style>