<script lang="ts">
  import CompoundedBuild from "$lib/components/content/CompoundedBuild.svelte";
  import DashedHeader from "$lib/components/content/DashedHeader.svelte";
  import Hero from "$lib/components/content/Hero.svelte";
  import ItemStatistics from "$lib/components/content/ItemStatistics.svelte";
  import RoundInfo from "$lib/components/content/RoundInfo.svelte";
  import RoundSelector from "$lib/components/content/RoundSelector.svelte";
  import { heroes } from "$lib/constants/heroes";
  import { ROUND_MAX } from "$lib/constants/round";
  import { testDataRoundInfos } from "$lib/data/testData";
  import type { Build } from "$lib/types/build";
  import type { CurrentRound } from "$lib/types/round";
  import { getBuildCostForRound } from "$lib/utils/build";
  import { setContext } from "svelte";

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext('currentRound', currentRound);

  const build: Build = {
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

  const { title, hero, introduction, author, roundInfos, description } = $derived(build);
</script>

<svelte:head>
  <title>{title} | {hero.name} | OW Armory</title>
</svelte:head>

<article itemscope itemtype="https://schema.org/Article">
  <header class="header">
    <Hero {hero} large />

    <div class="meta">
      <h1 class="title">{title}</h1>

      <a class="hero" href="/hero/{hero.name}">{hero.name}</a>
      <a class="author" href="/user/{author.username}" itemprop="author">{author.username}</a>
    </div>
  </header>

  <p class="introduction">{introduction}</p>

  <div class="layout">
    <aside class="sidebar block">
      <RoundSelector />

      <CompoundedBuild {build} />

      <h2 class="build-cost">Build cost: {getBuildCostForRound(build, 1).toLocaleString()}</h2>

      <DashedHeader text="Stats" />
      <ItemStatistics items={[]} {hero} />
    </aside>

    <section class="article block">
      {#each roundInfos as roundInfo, i (roundInfo.id)}
        <RoundInfo {roundInfo} header="Round {i + 1}" />
      {/each}

      {#if description}
        <h2>Description</h2>

        <!-- This will probably be markdown at some point, hence it being a div rather than a p tag -->
        <div class="description">{description}</div>
      {/if}
    </section>
  </div>
</article>

<style lang="scss">
  a {
    color: $secondary;
    text-decoration: none;

    &:hover {
      color: $white;
      text-decoration: underline;
    }
  }

  h2 {
    margin: $vertical-offset-large 0 1rem;

    @include breakpoint(tablet) {
      margin-bottom: 2rem;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include breakpoint(tablet) {
      flex-direction: row;
      gap: 0 2rem;
    }
  }

  .title {
    margin: 0;

    @include breakpoint(tablet) {
      margin: -0.5rem 0;
    }
  }

  .introduction {
    font-style: italic;
    margin: 1rem 0 $vertical-offset-large;

    @include breakpoint(tablet) {
      margin-top: 2rem;
    }
  }

  .hero {
    margin-right: 1rem;
    font-size: $font-size-h3;
    font-style: $font-stack-brand;
    font-weight: bold;
  }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include breakpoint(tablet) {
      display: grid;
      grid-template-columns: 23rem auto;
      gap: 4rem;
    }
  }

  .sidebar {
    min-height: 20rem;
  }

  .build-cost {
    margin: 2rem 0;
    color: $secondary;
    text-align: center;

    @include breakpoint(tablet) {
      margin: 4rem 0;
    }
  }
</style>
