import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    plugins: [svelte()],
    build: {
        dir: 'docs',
        emptyOutDir: true,
        target: 'esnext',
        base: '/star-equestrian-map/',
        assetsInclude: [ '**/*.png', '**/*.svg', '**/*.webp' ],
        rollupOptions: {
            output: {
                paths: {
                    'sidepanel': "/lib/sidepanel.js",
                    'condensedAttribution': "/lib/condensed-attribution.js",
                    "condensedAttribution-css": "/lib/condensed-attribution.css",
                    "shoelace": "/lib/shoelace",
                }
            },
            external: [ 'sidepanel', 'condensedAttribution', "sidepanel-css", "condensedAttribution-css", "shoelace",]
        },
    }
})