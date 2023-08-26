<script>
    import {allMarkers, collectionProgress, formatName} from "./stores.js";
    import {counts} from "../locations.js";

    function getCollectiblesProgress() {
        const unicornIds = $allMarkers.filter(marker => marker.options.name === "Toy Unicorn");
        const horseshoeIds = $allMarkers.filter(marker => marker.options.name === "Horseshoe");
        const sheriffBadgeIds = $allMarkers.filter(marker => marker.options.name === "Sheriff Badge");
        const bottleIds = $allMarkers.filter(marker => marker.options.name === "Bottle");
        const brazierIds = $allMarkers.filter(marker => marker.options.name === "Brazier");
        let temp = [0, 0, 0, 0, 0];
        [unicornIds, horseshoeIds, sheriffBadgeIds, bottleIds, brazierIds].forEach((category, i) => category.map((item) => {
            if (localStorage.getItem(`${item.options.id}.collected`)) {
                temp[i]++;
            }
        }))
        return temp;
    }

    $collectionProgress = getCollectiblesProgress();

    // Exclude braziers since they appear under a different heading
    const itemNames = ["toy-unicorn", "horseshoe", "sheriff-badge", "bottle"];

    // TODO: Make unicorn icon into webp for consistency
</script>
<h2>Collectibles</h2>
<div class="container">
    {#each itemNames as item, i}
<sl-progress-ring label={`Number of ${item}s collected`} value={$collectionProgress[i] * 100 / counts.find(x => x.name === formatName(item)).count}>
    <div class="progress-inner">
        <img src={item !== "toy-unicorn" ? `./icons/webp/${item}.webp` : `./icons/${item}.png`} alt={formatName(item)} height="32" />
        <p>{$collectionProgress[i]} / {counts.find(x => x.name === formatName(item)).count}</p>
    </div>
</sl-progress-ring>
        {/each}
</div>

<h2>Agricola Lighthouse</h2>
    <sl-progress-ring label="Number of braziers lit" value={$collectionProgress[4] * 100 / counts.find(x => x.name === "Brazier").count}>
        <div class="progress-inner"><p class="braziers">Braziers</p>
            <p>{$collectionProgress[4]} / {counts.find(x => x.name === "Brazier").count}</p></div>
    </sl-progress-ring>
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

    .braziers {
        margin: 0.8rem auto -0.3rem;
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