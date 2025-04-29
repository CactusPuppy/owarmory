<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import Navigation from "$lib/components/layout/Navigation.svelte";
  import PageBackground from "$lib/components/layout/PageBackground.svelte";
  import type { PageData } from "./$types";

  const { data, children }: { data: PageData; children: Snippet } = $props();

  setContext("currentUser", data.currentUser);
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
    padding: $vertical-offset-large $gutter;
    margin: 0 auto;
  }
</style>
