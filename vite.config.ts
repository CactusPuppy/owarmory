/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
					@use "$lib/scss/_variables.scss" as *;
					@use "$lib/scss/_functions.scss" as *;
					@use "$lib/scss/_mixins.scss" as *;
				`,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    exclude: ["e2e/**/*.*", "node_modules/**/*.*"],
  },
  build: {
    rollupOptions: {
      external: ["isomorphic-dompurify"],
    },
  },
});
