<script>
import UncollectButton from "./UncollectButton.svelte";
import {writable} from "svelte/store";
import {createEventDispatcher, getContext} from "svelte";

const collected = writable(false)

const dispatch = createEventDispatcher();

// const {getMarker} = getContext("marker")
// const marker = getMarker();
function handleClick(node) {
    // collect()
    node.addEventListener("click", () =>
        dispatch("collected", true)
    )
    // document.querySelector("#last-collected").innerHTML = `<sl-relative-time format="short" sync date="${new Date()}"></sl-relative-time>`;
}
</script>
<!--{#if $collected}-->
<!--    <UncollectButton></UncollectButton>-->
<!--    {:else}-->
    <sl-button use:handleClick variant="danger">Collect</sl-button>
    <sl-icon-button class="no-respawn" name="calendar-x" label="Not respawned"></sl-icon-button>
    <!--{/if}-->