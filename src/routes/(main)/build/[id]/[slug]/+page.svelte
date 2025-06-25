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
  import {
    getAllBuildItems,
    getAllBuildPowers,
    getBuildCostForRound,
    getBuildItemsForRound,
  } from "$lib/utils/build";
  import { getContext, onMount, setContext } from "svelte";
  import type { HeroName } from "$src/lib/types/hero";
  import type { FullStadiumBuild } from "$src/lib/types/build";
  import CurrencyIcon from "$src/lib/components/icon/CurrencyIcon.svelte";
  import { toSimpleDate } from "$src/lib/utils/datetime";
  import { cleanName } from "$src/lib/utils/user";
  import { buildEditPath, buildShortPath } from "$src/lib/utils/routes";
  import { markdown } from "$src/lib/utils/markdown";
  import TalentRichPreviews from "$src/lib/components/content/TalentRichPreviews.svelte";
  import Heroes from "$src/lib/components/content/Heroes.svelte";
  import BuildsList from "$src/lib/components/content/BuildsList.svelte";
  import { api } from "$src/lib/utils/api";
  import Tags from "$src/lib/components/content/Tags.svelte";
  import type { User } from "$src/generated/prisma";
  import ShareInput from "$src/lib/components/form/ShareInput.svelte";
  import { Tween } from "svelte/motion";
  import { quintOut } from "svelte/easing";
  import { formatDistanceToNowStrict } from "date-fns";
  import WarningIcon from "$lib/images/icons/warning.svelte";

  const { data } = $props();

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);

  const currentUser: User = getContext("currentUser");

  const { build, stats } = $derived(data);

  const {
    id,
    buildTitle: title,
    heroName,
    description,
    author,
    roundInfos,
    additionalNotes,
    tags,
    updatedAt,
  } = $derived(build as FullStadiumBuild);

  const hero = $derived({
    baseArmor: 0,
    baseShields: 0,
    ...heroFromHeroName(heroName as HeroName),
  });

  const buildCost = new Tween(0, {
    duration: 150,
    easing: quintOut,
  });
  $effect(() => {
    buildCost.set(getBuildCostForRound(build, currentRound.value));
  });

  let similarBuilds: FullStadiumBuild[] = $state([]);

  onMount(getSimilarBuilds);

  async function getSimilarBuilds() {
    const builds = await api<FullStadiumBuild[]>(
      `/builds/hero/${heroName}`,
      { page_size: "4" },
      fetch,
    );
    const buildsExcludingCurrentBuild = builds.filter((b) => b.id !== id);

    similarBuilds = buildsExcludingCurrentBuild.slice(0, 3);
  }
</script>

<svelte:head>
  <title>{title} | {hero.name} | OW Armory</title>
  <meta property="og:title" content="{title} | {hero.name} | OW Armory" />
  <meta property="og:description" content={description} />
  <meta name="description" content={description} />
</svelte:head>

<article itemscope itemtype="https://schema.org/Article">
  <header class="header">
    <Hero {hero} large />

    <div class="meta">
      <h1 class="title">{title}</h1>

      <a class="hero" href="/hero/{hero.name}">{hero.name}</a>
      <a class="author" href="/user/{encodeURIComponent(author.name!)}" itemprop="author">
        {cleanName(author.name!)}
      </a>

      {#if tags.length}
        <span class="divider">•</span>
        <Tags {tags} />
      {/if}

      <span class="divider">•</span>

      <time
        class="datetime"
        title={toSimpleDate(updatedAt.toString())}
        itemprop="dateModified"
        datetime={updatedAt.toString()}
      >
        Last updated {formatDistanceToNowStrict(updatedAt)} ago
      </time>
    </div>
  </header>

  <p class="introduction">{description}</p>

  {#if getAllBuildItems(build).some((item) => item.removed) || getAllBuildPowers(build).some((power) => power.removed)}
    <div class="removed-talents-warning">
      <div class="icon">
        <WarningIcon />
      </div>

      <div>
        <h3>Potentially Outdated Build</h3>
        <p>
          This build contains some items or powers which are currently marked as being removed. This
          might be due to the items in question being temporarily disabled, or the items may have
          been permanently retired.
        </p>
        <p>
          If you believe one of the items below is incorrectly marked as removed, or if you think an
          item should be marked as removed when it isn't, please let us know via our <a
            href="https://discord.gg/JNCx6U3g9F"
            target="_blank"
            rel="noopener noreferrer">Discord</a
          >.
        </p>
      </div>
    </div>
  {/if}

  <div class="layout">
    <aside class="sidebar block">
      {#if currentUser?.id === (build as FullStadiumBuild).authorId}
        <a class="button button--full-width edit" href={buildEditPath(build as FullStadiumBuild)}>
          Edit this build
        </a>
      {/if}

      <RoundSelector />

      <CompoundedBuild {build} />

      <h2 class="build-cost">
        Build Cost: <br />

        <CurrencyIcon scale={1.35} />
        {Math.round(buildCost.current).toLocaleString()}
      </h2>

      <DashedHeader text="Stats" />
      <ItemStatistics items={getBuildItemsForRound(build, currentRound.value)} {stats} {hero} />

      <div class="share">
        <ShareInput path={buildShortPath(build)} />
      </div>
    </aside>

    <section class="article block">
      <BuildItemOrder {build} />

      {#each roundInfos as roundInfo, i (roundInfo.id)}
        <RoundInfo {roundInfo} header="Round {i + 1}" />
      {/each}

      {#if additionalNotes}
        <h1 aria-level="2">Description</h1>

        <div class="description markdown">
          <TalentRichPreviews text={markdown(additionalNotes)} sanitized />
        </div>
      {/if}
    </section>
  </div>
</article>

{#if similarBuilds.length}
  <section class="heroes">
    <BuildsList header="Similar builds" builds={similarBuilds} />
  </section>
{/if}

<section class="heroes">
  <Heroes />
</section>

<style lang="scss">
  @use "sass:color";

  a:not(.button) {
    color: $secondary;
    text-decoration: none;

    &:hover {
      color: $white;
      text-decoration: underline;
    }
  }

  h1 {
    margin: $vertical-offset-large 0 calc($vertical-offset-large * 0.5);
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

  .divider {
    display: block;
    min-height: 0.25rem;
    opacity: 0.5;
    color: $color-text-alt;
    font-size: 0;

    @include breakpoint(tablet) {
      display: inline;
      font-size: inherit;
    }
  }

  .datetime {
    color: $color-text-alt;
    font-size: $font-size-small;
    font-style: italic;
  }

  .introduction {
    font-style: italic;
    margin: 1rem 0 $vertical-offset-large;

    @include breakpoint(tablet) {
      margin-top: 2rem;
    }
  }

  .removed-talents-warning {
    color: $yellow;
    border: 1px solid $yellow;
    background-color: color.adjust(color.change($yellow, $alpha: 50%), $lightness: -15%);
    border-radius: $border-radius;
    padding: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    margin-bottom: 1rem;
    border: 1px solid $yellow;

    @include breakpoint(mobile) {
      display: grid;
      grid-template-columns: 1fr auto;
    }
    .icon {
      width: calc($item-size * 1.5);
      height: calc($item-size * 1.5);
      flex-grow: 1;
    }

    h3 {
      color: inherit;
      margin-bottom: 0;
      margin-top: 0.5rem;
    }

    p:last-child {
      margin-bottom: 0;
    }

    a {
      color: inherit;
      text-decoration: underline;
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
      gap: clamp(1rem, 4vw, 4rem);
    }
  }

  .sidebar {
    min-height: 20rem;
  }

  .edit {
    margin-bottom: 2rem;
  }

  .build-cost {
    margin: 2rem 0;
    color: $secondary;
    text-align: center;

    @include breakpoint(tablet) {
      margin: 3rem 0;
    }
  }

  .heroes {
    margin-top: $vertical-offset-large;
  }

  .share {
    margin-top: 2rem;

    @include breakpoint(tablet) {
      margin-top: 3rem;
    }
  }
</style>
