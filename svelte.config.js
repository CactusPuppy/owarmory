import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess({
		css: {
      includePaths: ['src'],
      prependData: `
        @use "src/lib/scss/_functions.scss" as *;
      `,
    },
	}),
	kit: { adapter: adapter() }
};

export default config;
