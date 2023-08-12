<script>
    import {allMarkers, collectionProgress} from "./stores.js";

    function getCollectiblesProgress() {
        const unicornIds = $allMarkers.filter(marker => marker.options.name === "Toy Unicorn");
        const horseshoeIds = $allMarkers.filter(marker => marker.options.name === "Horseshoe");
        const sheriffBadgeIds = $allMarkers.filter(marker => marker.options.name === "Sheriff Badge");
        const bottleIds = $allMarkers.filter(marker => marker.options.name === "Bottle");
        let temp = [0, 0, 0, 0];
        [unicornIds, horseshoeIds, sheriffBadgeIds, bottleIds].forEach((category, i) => category.map((item) => {
            if (localStorage.getItem(`${item.options.id}.collected`)) {
                temp[i]++;
            }
        }))
        return temp;
    }

    $collectionProgress = getCollectiblesProgress();
</script>
<h2>Collectibles</h2>
<div class="container">
    <sl-progress-ring label="Number of toy unicorns collected" value={$collectionProgress[0] * 20}>
        <div class="progress-inner"><img src="./icons/toy-unicorn.png" width="32" height="32" alt="Toy Unicorn"/>
            <p>{$collectionProgress[0]} / 5</p></div>
    </sl-progress-ring>
    <sl-progress-ring label="Number of horseshoes collected" value={$collectionProgress[1] * 100 / 35}>
        <div class="progress-inner"><img src="./icons/horseshoe.png" width="32" height="32" alt="Horseshoe"/>
            <p>{$collectionProgress[1]} / 35</p></div>
    </sl-progress-ring>
    <sl-progress-ring label="Number of sheriff badges collected" value={$collectionProgress[2] * 100 / 15}>
        <div class="progress-inner"><img src="./icons/sheriffs-badge.png" width="32" height="32" alt="Sheriff Badge"/>
            <p>{$collectionProgress[2]} / 15</p></div>
    </sl-progress-ring>
    <sl-progress-ring label="Number of bottles collected" value={$collectionProgress[3] * 100 / 18}>
        <div class="progress-inner"><img src="./icons/message-in-a-bottle.png" height="32" alt="Bottle"/>
            <p>{$collectionProgress[3]} / 18</p></div>
    </sl-progress-ring>
</div>
<style>

    sl-progress-ring {
        --size: 5rem;
    }

    .container {
        display: flex;
        justify-content: space-between;
    }

    .progress-inner {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    .progress-inner img {
        margin-top: 0.8rem;
        margin-bottom: -0.5rem;
    }
</style>