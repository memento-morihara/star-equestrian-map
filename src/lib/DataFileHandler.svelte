<script>
    import {FileDropzone, getModalStore} from "@skeletonlabs/skeleton";
    import {allMarkers} from "$lib/stores.js";
    import {get} from "svelte/store";
    import {getData} from "$lib/utils.js";

    let files;

    const modalStore = getModalStore();

    const confirmModal = {
        type: "confirm",
        title: "Import data",
        body: "This will overwrite your browser's current data. Make sure to export your data first, unless you like to live dangerously.",
        response: (r) => r ? importData() : files = [],
    }

    function download() {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(getData())], {type: "application/json"});
        a.href = URL.createObjectURL(file);
        a.download = new Date().toISOString() + "_SE_Map_data.json";
        a.click();
    }

    function readFile(file, callback) {
        const reader = new FileReader();
        reader.onload = () => callback(null, reader.result);
        reader.onerror = (err) => callback(err);
        reader.readAsText(file);
    }

    function resetCollected() {
        $allMarkers.forEach(marker => {
            const store = get(marker.options.store);

            if (store?.lastCollected || store?.lastChecked) {
                marker.options.store.update(() => ({lastCollected: [null], lastChecked: [null]}));
                marker.setOpacity(1);
            } else if (store?.collected) {
                marker.options.store.update(() => ({collected: false}));
                marker.setOpacity(1);
            }
        });
    }

    async function importData() {
        resetCollected();

        readFile(files[0], (err, res) => {
            JSON.parse(res).forEach(result => {
                const match = $allMarkers.find(marker => result.id === marker.options.id);
                if (match) {
                    if (match.options.markerType === "respawning") {
                        if (![...result.lastCollected, ...result.lastChecked].filter(item => item !== null).length) {
                            return;
                        }
                        match.options.store.set({lastCollected: result.lastCollected, lastChecked: result.lastChecked});
                    } else if (match.options.markerType === "one-time") {
                        match.options.store.set({collected: result.collected});
                    }
                }
            });
        });
    }
</script>

<button class="btn variant-ghost-primary mb-4" on:click={download}>Export data</button>
<FileDropzone bind:files
              class="bg-primary-100"
              name="import"
              on:change={() => modalStore.trigger(confirmModal)}/>