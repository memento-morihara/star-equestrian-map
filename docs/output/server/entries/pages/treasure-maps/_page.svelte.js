import { c as create_ssr_component, b as subscribe, n as each, f as add_attribute } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores2.js";
const css = {
  code: "main.svelte-eng4oz{text-align:center;margin-top:2.3rem;height:100%;overflow:auto}p.svelte-eng4oz{margin:1rem}.gallery.svelte-eng4oz{width:80%;max-width:1200px;margin:2rem auto 5rem;display:grid;grid-template-columns:repeat(3, 1fr);grid-template-rows:repeat(2, 1fr);grid-gap:1rem;height:auto}@media(max-width: 600px){.gallery.svelte-eng4oz{grid-template-columns:repeat(1, 1fr)}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let data = JSON.parse($page.data.data).filter((item) => item.media);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<main class="svelte-eng4oz"><h1 class="h1" data-svelte-h="svelte-u30jsa">Treasure Maps</h1> <p class="svelte-eng4oz" data-svelte-h="svelte-1qg604b">Click on a map to view the location on the interactive map!</p> <div class="gallery overflow-auto svelte-eng4oz">${each(data, (item) => {
    return `<a${add_attribute("href", `${"/"}?id=${item.id}`, 0)} target="_blank"><img${add_attribute("src", item.media, 0)} alt="Treasure map"></a>`;
  })}</div> </main>`;
});
export {
  Page as default
};
