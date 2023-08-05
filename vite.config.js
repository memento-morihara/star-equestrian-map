import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'
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
                    'sidepanel-css': "/lib/sidepanel.css",
                    "condensedAttribution-css": "/lib/condensed-attribution.css",
                    "shoelace": "/lib/shoelace",
                    "oms": "https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier-Leaflet/0.2.6/oms.min.js"
                }
            },
            external: [ 'sidepanel', 'condensedAttribution', "sidepanel-css", "condensedAttribution-css", "shoelace", "oms"]
        },
    }
})