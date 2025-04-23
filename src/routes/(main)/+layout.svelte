<script lang="ts">
	import type { Snippet } from "svelte";
	import Navigation from "$lib/components/layout/Navigation.svelte";
	import PageBackground from "$lib/components/layout/PageBackground.svelte";

  const { children }: { children: Snippet } = $props()
</script>

<Navigation />

<main>
  {@render children()}
</main>

<PageBackground />

<style lang="scss">
  @use "sass:map";

  main {
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    padding: clamp($gutter, 10vw, 7.5rem) $gutter;
    margin: 0 auto;
  }
</style>
