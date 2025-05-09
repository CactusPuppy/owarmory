<script lang="ts">
  import type { FullStadiumBuild } from "$src/lib/types/build";
  import { filterUniqueBuilds } from "$src/lib/utils/build";
  import Build from "./Build.svelte";
  import RoundSelector from "./RoundSelector.svelte";

  interface Props {
    header: string;
    builds: FullStadiumBuild[];
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
  {#each filterUniqueBuilds(builds) as build (build.id)}
    <Build {build} />
  {:else}
    <center>
      <p class="no-content"><i>There's nothing here... yet</i></p>
    </center>
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

    &:first-child {
      margin-top: 0;
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

  .no-content {
    color: $color-text-alt;
    font-size: 1.25em;
  }
</style>
