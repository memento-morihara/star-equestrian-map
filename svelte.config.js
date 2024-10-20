import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  extensions: [".svelte"],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      strict: false,
      paths: {
        base: process.env.PUBLIC_BASE_PATH,
      },
    }),
  },
};
export default config;
