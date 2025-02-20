import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({ compiler: "svelte", autoInstall: true }),
    purgeCss({
      content: ["src/**"],
      css: ["src/app.postcss"],
      safelist: {
        greedy: [/^leaflet/]
      }
    })
  ],
  build: {
    emptyOutDir: true,
    target: "esnext"
  }
});
