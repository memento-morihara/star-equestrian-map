import {purgeCss} from 'vite-plugin-tailwind-purgecss';
import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import Icons from 'unplugin-icons/vite'
import {SvelteKitPWA} from "@vite-pwa/sveltekit";

export default defineConfig({
    plugins: [
        sveltekit(),
        Icons({compiler: 'svelte'}),
        purgeCss({
            content: ['src/**'],
            css: ['src/app.postcss'],
            safelist: {
                greedy: [/^leaflet/]
            }
        }),
    ],
    build: {
        emptyOutDir: true,
    },
});
