import { defineConfig } from 'vite';
export default defineConfig({
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
                }
            },
            external: [ 'sidepanel', 'condensedAttribution', "sidepanel-css", "condensedAttribution-css", "shoelace"]
        },
    }
})