import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.a7b68d12.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.8eef7868.js","_app/immutable/chunks/index.be8e8663.js","_app/immutable/chunks/stores.77c94b26.js","_app/immutable/chunks/index.7a2d8fa9.js"];
export const stylesheets = ["_app/immutable/assets/0.8902fe46.css","_app/immutable/assets/stores.4f1e9ba5.css"];
export const fonts = [];
