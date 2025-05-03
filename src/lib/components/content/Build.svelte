<script lang="ts">
  import { goto } from "$app/navigation";
  import type { FullStadiumBuild } from "$lib/types/build";
  import { heroFromHeroName } from "$lib/constants/heroData";
  import type { HeroName } from "$lib/types/hero";
  import type { CurrentRound } from "$lib/types/round";
  import { getBuildItemsForRound, getBuildPowersForRound } from "$lib/utils/build";
  import { slide } from "svelte/transition";
  import { getContext } from "svelte";
  import Hero from "./Hero.svelte";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";

  const { build }: { build: FullStadiumBuild } = $props();

  const hero = $derived(heroFromHeroName(build.heroName as HeroName));

  const currentRound: CurrentRound = getContext("currentRound");

  const items = $derived(getBuildItemsForRound(build, currentRound.value));
  const powers = $derived(getBuildPowersForRound(build, currentRound.value));

  const href = $derived(`/build/${build.id}`);

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
      By <a href="/user/username">user</a>
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
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $font-stack-brand;
    font-weight: bold;
    color: $white;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      box-shadow: 0 2px 0 $white;
    }
  }

  .author {
    font-size: $font-size-small;
    color: $color-text-alt;

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
</style>
