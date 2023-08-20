import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte()],
    build: {
        emptyOutDir: true,
        target: 'esnext',
        base: '/star-equestrian-map/',
        assetsInclude: ['**/*.png', '**/*.svg', '**/*.webp'],
    }
})