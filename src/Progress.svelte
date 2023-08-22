<script>
    import {allMarkers, collectionProgress} from "./stores.js";
    import {counts} from "../locations.js";

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
            <p>{$collectionProgress[0]} / {counts.find(x => x.name === "Toy Unicorn").count}</p></div>
    </sl-progress-ring>
    <sl-progress-ring label="Number of horseshoes collected" value={$collectionProgress[1] * 100 / 35}>
        <div class="progress-inner"><img alt="Horseshoe" height="32" src="./icons/webp/horseshoe.webp" width="32"/>
            <p>{$collectionProgress[1]} / {counts.find(x => x.name === "Horseshoe").count}</p></div>
    </sl-progress-ring>
    <sl-progress-ring label="Number of sheriff badges collected" value={$collectionProgress[2] * 100 / 15}>
        <div class="progress-inner"><img alt="Sheriff Badge" height="32" src="./icons/webp/sheriffs-badge.webp"
                                         width="32"/>
            <p>{$collectionProgress[2]} / {counts.find(x => x.name === "Sheriff Badge").count}</p></div>
    </sl-progress-ring>
    <sl-progress-ring label="Number of bottles collected" value={$collectionProgress[3] * 100 / 18}>
        <div class="progress-inner"><img alt="Bottle" height="32" src="./icons/webp/message-in-a-bottle.webp"/>
            <p>{$collectionProgress[3]} / {counts.find(x => x.name === "Bottle").count}</p></div>
    </sl-progress-ring>
</div>
<style>


    sl-progress-ring {
        --size: 80px;
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
        margin: 0.8rem 0 -0.5rem;
    }


    @media screen and (max-width: 450px) {
        .container {
            width: 250px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            margin: 0 auto;
        }

        sl-progress-ring {
            margin: 0 auto 2rem;
        }
    }
</style>