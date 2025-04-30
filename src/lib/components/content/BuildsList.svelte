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
    id: "cuid091234",
    authorId: "cuid23450789",
    createdAt: new Date(),
    updatedAt: new Date(),
    buildTitle: "I am a build for a hero",
    additionalNotes:
      "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    description:
      "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    heroName: heroes[0].name,
    author: {
      id: "cuid23450789",
      username: "Some guy",
      oauthId: "bca0d6cc-d47d-4e67-8ca2-57d13af97d80",
    },
    roundInfos: testDataRoundInfos,
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
