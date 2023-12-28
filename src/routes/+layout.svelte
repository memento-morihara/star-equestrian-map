<script>
    import "../app.postcss";
    import {autoModeWatcher, initializeStores, Modal} from "@skeletonlabs/skeleton";

    initializeStores();
</script>

<svelte:head
>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
    <link href="/manifest.json" rel="manifest"/>
    <meta content="#272727" media="(prefers-color-scheme:dark)" name="theme-color"/>
    <link href="/apple-touch-icon-precomposed.png" rel="apple-touch-icon">
    <link href="/favicon.png" rel="icon"/>
</svelte:head
>
<Modal class="z-[10000]"/>
<slot/>
