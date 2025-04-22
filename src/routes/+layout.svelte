<script lang="ts">
	import type { Snippet } from "svelte";
  import "$lib/scss/global.scss";
	import Navigation from "$lib/components/layout/Navigation.svelte";

  const { children }: { children: Snippet } = $props()
</script>

<Navigation />

<main>
  {@render children()}
</main>

<style lang="scss">
  @use "sass:map";

  main {
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    padding: 0 $gutter;
    margin: 0 auto;
  }
</style>
