<script lang="ts">
  import { heroes } from "$lib/constants/heroes";
  import { testDataRoundInfos } from "$lib/data/testData";
  import Build from "./Build.svelte";
  import { type Build as BuildType } from "$lib/types/build";
  import RoundSelector from "./RoundSelector.svelte";

  interface Props {
    header: string;
  }

  const { header }: Props = $props();

  // Temp
  const build: BuildType = {
    title: "I am a build for a hero",
    introduction:
      "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    description:
      "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    hero: heroes[0],
    author: {
      username: "Some guy",
    },
    roundInfos: testDataRoundInfos
  };
</script>

<header class="header">
  <h2>{header}</h2>

  <div class="round-selector">
    <RoundSelector />
  </div>
</header>

<div class="block list">
  <Build {build} />
  <Build {build} />
  <Build {build} />
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
