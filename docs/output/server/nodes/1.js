

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.478a7a1f.js","_app/immutable/chunks/scheduler.8eef7868.js","_app/immutable/chunks/index.be8e8663.js","_app/immutable/chunks/stores.f7ec43a8.js","_app/immutable/chunks/singletons.fa8015f0.js","_app/immutable/chunks/index.7a2d8fa9.js"];
export const stylesheets = [];
export const fonts = [];
