  <script>
      import {getContext} from "svelte";

      const {getMarker} = getContext("marker");
      const marker = getMarker();
  </script>

  <div class="container">
<strong class:centered={!marker.options.description}>{marker.options.name}</strong>
{#if marker.options.description}
    <p class="static-desc">{marker.options.description}</p>
{/if}
  </div>

  <style>
      .container {
          font-size: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
      strong {
          font-size: 1.3rem;
          vertical-align: middle;
          margin-bottom: 0.2em;
      }
      .centered {
          margin: 0 auto;
      }
      .static-desc {
          margin-bottom: 0.3em;
      }
  </style>