<script>
    import "../app.postcss";
    import {autoModeWatcher} from "@skeletonlabs/skeleton";
</script>

<svelte:head
>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
    <link href="/manifest.json" rel="manifest"/>
</svelte:head
>
<slot/>
