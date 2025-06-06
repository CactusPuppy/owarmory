<script lang="ts">
  const { children } = $props();
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<main>
  {@render children()}
</main>

<style lang="scss">
  @use "sass:map";

  main {
    width: 100%;
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    padding: $vertical-offset-large $gutter;
    margin: 0 auto;
  }
</style>
