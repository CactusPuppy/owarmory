<script lang="ts">
  import BuildItemOrder from "$lib/components/content/BuildItemOrder.svelte";
  import CompoundedBuild from "$lib/components/content/CompoundedBuild.svelte";
  import DashedHeader from "$lib/components/content/DashedHeader.svelte";
  import Hero from "$lib/components/content/Hero.svelte";
  import ItemStatistics from "$lib/components/content/ItemStatistics.svelte";
  import RoundInfo from "$lib/components/content/RoundInfo.svelte";
  import RoundSelector from "$lib/components/content/RoundSelector.svelte";
  import { heroFromHeroName } from "$lib/constants/heroData";
  import { ROUND_MAX } from "$lib/constants/round";
  import type { CurrentRound } from "$lib/types/round";
  import { getBuildCostForRound } from "$lib/utils/build";
  import { setContext } from "svelte";
  import type { HeroName } from "$src/lib/types/hero";
  import { getBuildContext } from "$src/lib/contexts/buildContext";
  import type { FullStadiumBuild } from "$src/lib/types/build";

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);

  const build = getBuildContext();

  const {
    buildTitle: title,
    heroName,
    description,
    author,
    roundInfos,
    additionalNotes,
  } = $derived(build as FullStadiumBuild);

  const hero = $derived(heroFromHeroName(heroName as HeroName));
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
      <a class="author" href="/user/{author.name}" itemprop="author">{author.name}</a>
    </div>
  </header>

  <p class="introduction">{description}</p>

  <div class="layout">
    <aside class="sidebar block">
      <RoundSelector />

      <CompoundedBuild {build} />

      <h2 class="build-cost">
        Build cost: {getBuildCostForRound(build, currentRound.value).toLocaleString()}
      </h2>

      <DashedHeader text="Stats" />
      <ItemStatistics items={[]} {hero} />
    </aside>

    <section class="article block">
      <BuildItemOrder {build} />

      {#each roundInfos as roundInfo, i (roundInfo.id)}
        <RoundInfo {roundInfo} header="Round {i + 1}" />
      {/each}

      {#if additionalNotes}
        <h2>Description</h2>

        <!-- This will probably be markdown at some point, hence it being a div rather than a p tag -->
        <div class="description">{additionalNotes}</div>
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
