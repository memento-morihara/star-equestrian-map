<script>
    import "../app.postcss";
    import {autoModeWatcher, initializeStores, Modal} from "@skeletonlabs/skeleton";

    initializeStores();
</script>

<svelte:head
>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
    <link href="/manifest.json" rel="manifest"/>
</svelte:head
>
<Modal class="z-[50000]"/>
<slot/>
