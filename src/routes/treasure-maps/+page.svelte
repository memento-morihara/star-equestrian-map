<script>
  import { page } from "$app/stores";

  let data = JSON.parse($page.data.data).filter(item => item.media);
</script>

<main>
  <h1 class="h1">Treasure Maps</h1>
  <p>Click on a map to view the location on the interactive map!</p>
  <div class="gallery overflow-auto">
    {#each data as item}
      <a href={`${import.meta.env.BASE_URL}?id=${item.id}`} target="_blank"><img src={item.media} alt="Treasure map" /></a>
    {/each}
  </div>
</main>

<style>
    main {
        text-align: center;
        margin-top: 2.3rem;
        height: 100%;
        overflow: auto;
    }

    p {
        margin: 1rem;
    }

    .gallery {
        width: 80%;
        max-width: 1200px;
        margin: 2rem auto 5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 1rem;
        height: auto;
    }

    @media (max-width: 600px) {
        .gallery {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>