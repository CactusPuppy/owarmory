<script lang="ts">
  import { heroes } from "$lib/constants/heroData";
  import { testDataRoundInfos } from "$lib/data/testData";
  import type { FullStadiumBuild } from "$lib/types/build";
  import Build from "./Build.svelte";
  import RoundSelector from "./RoundSelector.svelte";

  interface Props {
    header: string;
  }

  const { header }: Props = $props();

  // Temp
  const build: FullStadiumBuild = {
    buildTitle: "I am a build for a hero",
    additionalNotes:
      "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    description:
      "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    heroName: heroes[0].name,
    // @ts-expect-error author type does not exist yet
    author: {
      username: "Some guy",
    },
    roundInfos: testDataRoundInfos,
  };
</script>

<header class="header">
  <h1>{header}</h1>

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
  h1 {
    margin: 0;
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
