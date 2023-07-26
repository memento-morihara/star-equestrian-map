import { defineConfig } from 'vite';

export default defineConfig({
    build: {
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
                    "condensedAttribution-css": "/lib/condensed-attribution.css"
                }
            },
            external: [ 'sidepanel', 'condensedAttribution', "sidepanel-css", "condensedAttribution-css" ]
        },
    }
})