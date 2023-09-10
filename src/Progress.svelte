<script>
    import { allMarkers, collectionProgress, formatName } from "./stores.js";
    import { counts } from "../locations.js";

    const itemNames = [
        "Toy Unicorn",
        "Horseshoe",
        "Sheriff Badge",
        "Bottle",
        "Brazier",
    ];

    function getCollectiblesProgress() {
        let itemIds = [];
        for (const { name, i } of itemNames) {
            itemIds[i] = $allMarkers.filter(
                (marker) => marker.options.name === name
            );
        }
        let temp = [0, 0, 0, 0, 0];

        itemIds.forEach((category, i) =>
            category.map((item) => {
                if (localStorage.getItem(`${item.options.id}.collected`)) {
                    temp[i]++;
                }
            })
        );
        return temp;
    }

    $collectionProgress = getCollectiblesProgress();
</script>

<h2>Collectibles</h2>
<div class="container">
    {#each itemNames as item, i}
        {#if item !== "Brazier"}
            <sl-progress-ring
                label={`Number of ${item}s collected`}
                value={($collectionProgress[i] * 100) /
                    counts.find((x) => x.name === item).count}
            >
                <div class="progress-inner">
                    <img
                        src={`./icons/${formatName(item)}.webp`}
                        alt={item}
                        height="32"
                    />
                    <p>
                        {$collectionProgress[i]} / {counts.find(
                            (x) => x.name === item
                        ).count}
                    </p>
                </div>
            </sl-progress-ring>
        {/if}
    {/each}
</div>

<h2>Agricola Lighthouse</h2>
<sl-progress-ring
    label="Number of braziers lit"
    value={($collectionProgress[4] * 100) /
        counts.find((x) => x.name === "Brazier").count}
>
    <div class="progress-inner">
        <p class="braziers">Braziers</p>
        <p>
            {$collectionProgress[4]} / {counts.find((x) => x.name === "Brazier")
                .count}
        </p>
    </div>
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
