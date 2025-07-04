<script lang="ts">
  import { goto } from "$app/navigation";
  import type { FullStadiumBuild } from "$lib/types/build";
  import { heroFromHeroName } from "$lib/constants/heroData";
  import type { HeroName } from "$lib/types/hero";
  import type { CurrentRound } from "$lib/types/round";
  import { getBuildItemsForRound, getBuildPowersForRound } from "$lib/utils/build";
  import { slide } from "svelte/transition";
  import { getContext } from "svelte";
  import { buildPath } from "$src/lib/utils/routes";
  import Hero from "./Hero.svelte";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";
  import { cleanName } from "$src/lib/utils/user";
  import { formatDistanceToNowStrict } from "date-fns";
  import { toSimpleDate } from "$src/lib/utils/datetime";

  const { build }: { build: FullStadiumBuild } = $props();

  const hero = $derived(heroFromHeroName(build.heroName as HeroName));

  const currentRound: CurrentRound = getContext("currentRound");

  const items = $derived(getBuildItemsForRound(build, currentRound.value));
  const powers = $derived(getBuildPowersForRound(build, currentRound.value));

  const href = $derived(buildPath(build));

  function onclick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.nodeName === "A") return;
    if (target.closest("a")) return;

    goto(href);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- A proper link can be found right in the div. It doesn't impede a11y. -->
<div class="build" {onclick}>
  {#if hero}
    <Hero {hero} />
  {:else}
    <h1>Unknown Hero</h1>
  {/if}

  <div class="meta">
    <a {href} class="name">{build.buildTitle}</a>

    <div class="author">
      By
      <a href={`/user/${encodeURIComponent(build.author.name!)}`}>
        {cleanName(build.author.name!)}
      </a>
      <span class="divider">•</span>
      <time
        class="datetime"
        title={toSimpleDate(build.updatedAt.toString())}
        itemprop="dateModified"
        datetime={build.updatedAt.toString()}
      >
        Last updated {formatDistanceToNowStrict(build.updatedAt)} ago
      </time>
    </div>
  </div>

  <div class="items">
    {#each powers as power (power.id)}
      <div transition:slide={{ duration: 100, axis: "x" }}>
        <Power {power} />
      </div>
    {/each}

    {#each items as item (item.id)}
      <div transition:slide={{ duration: 100, axis: "x" }}>
        <Item {item} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .build {
    $transition-duration: 25ms;
    --outline-size: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    border-radius: $border-radius-small;
    box-shadow: 0 0 0 $color-bg-light;
    transition:
      box-shadow $transition-duration,
      background-color $transition-duration $transition-duration;
    cursor: pointer;

    @include breakpoint(tablet) {
      display: grid;
      grid-template-columns: 50px 1fr 1fr;
      flex-wrap: nowrap;
    }

    &:hover,
    &:active {
      background: $color-bg-light;
      box-shadow: 0 0 0 var(--outline-size) $color-bg-light;
      transition: box-shadow $transition-duration;

      @include breakpoint(tablet) {
        --outline-size: 1rem;
      }
    }
  }

  .meta {
    line-height: 1;
  }

  .name {
    display: block;
    margin-bottom: 0.25rem;
    font-family: $font-stack-brand;
    font-weight: bold;
    color: $white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
  }

  .author {
    font-size: $font-size-small;
    color: $color-text-alt;
    white-space: nowrap;

    a {
      color: $color-text-alt;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: $white;
      }
    }
  }

  .items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    min-width: 0;

    @include breakpoint(tablet) {
      justify-content: flex-end;
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
</style>
