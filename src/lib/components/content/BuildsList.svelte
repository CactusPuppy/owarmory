<script lang="ts">
  import Build from "./Build.svelte";
  import { type Build as BuildType } from "$lib/types/build";
  import RoundSelector from "./RoundSelector.svelte";

  interface Props {
    header: string;
    builds: BuildType[];
  }

  const { header, builds }: Props = $props();
</script>

<header class="header">
  <h2>{header}</h2>

  <div class="round-selector">
    <RoundSelector />
  </div>
</header>

<div class="block list">
  <!-- eslint-disable-next-line svelte/require-each-key -->
  {#each builds as build}
    <Build {build} />
  {/each}
</div>

<style lang="scss">
  h2 {
    margin: 0;
    font-size: $font-size-h1;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: $vertical-offset-large 0 1rem;

    @include breakpoint(tablet) {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  .round-selector {
    margin: 0.5rem 0 0;
    @include breakpoint(tablet) {
      margin: 0 0 0.75rem;
    }
  }

  .list {
    display: grid;
    gap: 2rem;
  }
</style>
