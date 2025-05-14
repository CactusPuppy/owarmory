import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: { $src: "src" },
    csp: {
      directives: {
        "script-src": ["self"],
      },
    },
  },
};

export default config;
