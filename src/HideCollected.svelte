<script>
    import {hideCollected, shownMarkers} from "./stores.js";
    import {getContext, onMount} from "svelte";
    import {chests, collectibles, food, resources} from "../markers.js";

    const map = getContext("map")();
    let checkboxes;

    onMount(() => checkboxes = document.querySelectorAll(".hide"));

    $hideCollected = localStorage.getItem("hideCollected")?.split(",") ?? [];

    // function toggleAll(show) {
    //    show ? $shownMarkers.forEach(marker => marker.opacity < 1 ? marker.remove() : null) : null;
    //    checkboxes.forEach(c => c.checked = show);
    // }

    function hide(category) {
        $shownMarkers.forEach(marker => marker.options.collected && checkboxes[0].checked ? marker.remove() : marker.addTo(map))
        if (category === "all") {
            $hideCollected.length === 4 ? $hideCollected = [] : $hideCollected = ["food", "resources", "chests", "collectibles"];
            // $shownMarkers.filter(marker => ["food", "resources", "chests", "collectibles"].includes(marker.category)).forEach(marker => marker.remove())
        } else {
            $hideCollected = $hideCollected.includes(category) ? $hideCollected.filter(item => item !== category) : [...$hideCollected, category];
            // $shownMarkers.filter(marker => marker.options.category === category).forEach(marker => {
            //     if (marker.options.opacity < 1) {
            //         marker.remove();
            //     }
            // })
        }

        // if (category === "all") {
        //         // $hideCollected = [...$hideCollected, ...items.map(item => {if (item.parent !== "Other") {return item.children}})];
        //         $hideCollected = ["food", "resources", "collectibles", "chests"]
        //
        // } else {
        //     $hideCollected = $hideCollected.includes(category) ? $hideCollected.filter(item => item !== category) : [...$hideCollected, category];
        // }
        // switch (category) {
        //     case "all":
        //         checkboxes[0].checked ? $hideCollected = ["food", "resources", "collectibles", "chests"] : $hideCollected = [];
        //         checkboxes.forEach(c => c.checked = checkboxes[0].checked);
        //         break;
        //     case "food":
        //         // hidden = [...hidden, "food"];
        //         if (checkboxes[1].checked) {
        //             $shownMarkers.filter(marker => marker.options.category === "food").forEach(marker => marker.remove())
        //         } else {
        //             $shownMarkers.filter(marker => marker.options.category === "food").forEach(marker => marker.addTo(map))
        //         }
        //         $hideCollected = $hideCollected.includes("food") ? $hideCollected.filter(item => item !== "food") : [...$hideCollected, "food"];
        //         break;
        //     case "resources":
        //         $shownMarkers.forEach(marker => marker.options.category === "resources" ? marker.remove() : null)
        //         $hideCollected = $hideCollected.includes("resources") ? $hideCollected.filter(item => item !== "resources") : [...$hideCollected, "resources"];
        //         break;
        //     case "collectibles":
        //         $shownMarkers.forEach(marker => marker.options.category === "collectibles" ? marker.remove() : null)
        //         $hideCollected = $hideCollected.includes("collectibles") ? $hideCollected.filter(item => item !== "collectibles") : [...$hideCollected, "collectibles"];
        //         // hidden = [...hidden, "resources"];
        //         break;
        //     case "chests":
        //         $shownMarkers.forEach(marker => marker.options.category === "chests" ? marker.remove() : null)
        //         $hideCollected = $hideCollected.includes("chests") ? $hideCollected.filter(item => item !== "chests") : [...$hideCollected, "chests"];
        //         // hidden = [...hidden, "chests"];
        //         break;
        // }
        // initHidden()
        // items.map(item => {
        //     if ($hideCollected.includes(formatName(item.parent))) {
        //         $shownMarkers.forEach(marker => {
        //             if (marker.options.opacity < 1 && item.children.includes(formatName(marker.options.name))) {
        //                 $hiddenCollected.includes(marker.options.name) ? marker.remove() : null;
        //             }
        //         })
        //     }
        // })
        if ($hideCollected.length === 4) {
            checkboxes.forEach(c => c.checked = true);
            $shownMarkers.forEach(marker => marker.options.opacity < 1 ? marker.remove() : null)
        } else if ($hideCollected.length > 0 && $hideCollected.length < 4) {
            checkboxes.forEach(c => c.checked = $hideCollected.includes(c.value))
            checkboxes[0].checked = false;
            checkboxes[0].indeterminate = true;
        } else if ($hideCollected.length === 0) {
            checkboxes.forEach(c => {
                c.checked = false;
                c.indeterminate = false
            })
        }
        // If the array is empty, remove the key from localStorage entirely
        $hideCollected.length > 0 ? localStorage.setItem("hideCollected", $hideCollected) : localStorage.removeItem("hideCollected");
    }

    onMount(() => {
        if ($hideCollected.length === 4) {
            checkboxes.forEach(c => c.checked = true);
            $shownMarkers.forEach(marker => marker.options.opacity < 1 ? marker.remove() : null)
        } else if ($hideCollected.length > 0 && $hideCollected.length < 4) {
            checkboxes.forEach(c => c.checked = $hideCollected.includes(c.value))
            checkboxes[0].checked = false;
            checkboxes[0].indeterminate = true;
        }

        // $shownMarkers.forEach(marker => $hiddenCollected.includes(marker.options.name) && marker.options.opacity < 1 ? marker.remove() : null);
    })


    // $: $shownMarkers.forEach(marker => $hideCollected.includes(formatName(marker.options.name)) && marker.options.opacity < 1 ? marker.remove() : null)
    // onMount(() => initHidden());
    //  $: checkboxes && checkboxes.forEach(c => c.checked = $hideCollected.includes(c.value))
    // $: checkboxes && $hideCollected.forEach(value => checkboxes.forEach(c => c.value === value ? c.checked = true && hide(value) : c.checked = false))
    //    $:{
    //        if (checkboxes) {
    //
    //
    //            if (checkboxes[0].checked) {
    //                checkboxes.forEach(c => c.checked = true);
    //                checkboxes[0].indeterminate = false;
    //                // checkboxes[0].checked = true;
    //            } else if ($hideCollected.length > 0 && $hideCollected.length < 4) {
    //                checkboxes[0].checked = false;
    //                checkboxes[0].indeterminate = true;
    //                $hideCollected.forEach(item => checkboxes.find(c => c.value === item).checked = true)
    //            }
    //        }
    //    }
    //     $: {
    // $hideCollected.forEach(category => $shownMarkers.filter(marker => marker.options.category === category && marker.options.opacity < 1 ? marker.remove() : null))
    //
    //                  // $shownMarkers.forEach(marker => {
    //                  //     if (marker.options.opacity < 1 && $hideCollected.includes(marker.options.category)) {
    //                  //         marker.remove();
    //                  //     }
    //                  //
    //         let temp = [];
    //         $hideCollected.forEach(category => $shownMarkers.filter(marker => marker.options.category === category ? temp.push(marker) : null));
    //         temp.filter(marker => marker.options.opacity < 1).forEach(x => map.hasLayer(x) ? x.remove() : x.addTo(map))
    //
    //     }
    //  $: checkboxes && checkboxes.forEach(c => c.checked = $hideCollected.includes(c.value));
    // $: {
    //  if (checkboxes && checkboxes[0].checked) {
    //      checkboxes.forEach(checkbox => checkbox.checked = true)
    //  }
    // }
    //
    // $: {
    //     $shownMarkers.forEach(marker => marker.remove());
    //     $shownMarkers.forEach(marker => !$hiddenCollected.includes(marker) ? marker.remove() : marker.addTo(map))
    // }
    //
    // $: $shownMarkers.forEach(marker => $hideCollected.includes(marker.options.category) ? marker.remove() : null);
    // $: $hiddenCollected.forEach(category => $shownMarkers.forEach(marker => marker.options.category !== category ? marker.addTo(map) : null))

    // $: console.log($hiddenCollected)

</script>

<div id="hide-collected">
    <strong>Hide collected items</strong>

    <sl-checkbox class="hide" on:sl-change={() => hide("all")}>All</sl-checkbox>
    <!--<sl-checkbox class="hide"  on:sl-change={() => hide("food")} value="food">Food</sl-checkbox>-->
    <!--<sl-checkbox class="hide"  on:sl-change={() => hide("resources")} value="resources">Resources</sl-checkbox>-->
    <!--<sl-checkbox class="hide" on:sl-change={() => hide("chests")} value="chests">Chests</sl-checkbox>-->
    <!--<sl-checkbox class="hide" on:sl-change={() => hide("collectibles")} value="collectibles">Collectibles</sl-checkbox>-->
</div>

<!--<sl-checkbox value={category} on:sl-change={() => hide(category)}>{formatName(category)}</sl-checkbox>-->
