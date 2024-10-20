import * as server from '../entries/pages/treasure-maps/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/treasure-maps/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/treasure-maps/+page.server.js";
export const imports = ["_app/immutable/nodes/3.80a33349.js","_app/immutable/chunks/scheduler.8eef7868.js","_app/immutable/chunks/each.3d878967.js","_app/immutable/chunks/index.be8e8663.js","_app/immutable/chunks/stores.f7ec43a8.js","_app/immutable/chunks/singletons.fa8015f0.js","_app/immutable/chunks/index.7a2d8fa9.js"];
export const stylesheets = ["_app/immutable/assets/3.d4abcb01.css"];
export const fonts = [];
