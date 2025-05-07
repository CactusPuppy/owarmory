<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import Navigation from "$lib/components/layout/Navigation.svelte";
  import PageBackground from "$lib/components/layout/PageBackground.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import type { PageData } from "./$types";
  import NavigatingIndicator from "$src/lib/components/layout/NavigatingIndicator.svelte";

  const { data, children }: { data: PageData; children: Snippet } = $props();

  setContext("currentUser", data.currentUser);
</script>

<NavigatingIndicator />

<Navigation />

<main>
  {@render children()}
</main>

<Footer />

<PageBackground />

<style lang="scss">
  @use "sass:map";

  main {
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    min-height: calc(100vh - $navigation-height - $footer-height);
    padding: $vertical-offset-large $gutter;
    margin: 0 auto;
  }
</style>
