<script lang="ts">
  import type { Build } from "$lib/types/build";
  import Heroes from "$lib/components/content/Heroes.svelte";
  import type { HeroData } from "$lib/types/hero";

  const { build = $bindable() }: { build: Build } = $props();

  const { title, description, roundInfos } = $derived(build);

  let currentRoundIndex = $state(0);
  let selectedHero: HeroData | null = $state(build.hero);

  function selectHero(event: MouseEvent, hero: HeroData): void {
    event.preventDefault();

    selectedHero = hero;
  }
</script>

<Heroes onclick={selectHero} highlightedHero={selectedHero}>
  {#snippet header()}{/snippet}
</Heroes>

<div class="form-group">
  <label class="form-label" for="title">Build title</label>
  <input type="text" class="form-input form-input--large" value={title} name="title" id="title" />
</div>

<div class="form-group">
  <label class="form-label" for="description">Short description</label>
  <p class="form-help" id="description">
    A short introduction to your builds, quickly summarizing the main playstyle and intention. You can provide a more detail description later.
  </p>
  <textarea class="form-textarea" value={description} name="description" aria-describedby="description"></textarea>
</div>

<h2>Powers & Items</h2>

<p class="form-help">
  Select powers and items per round. You can provide alternative options per round.
</p>

<div class="tabs">
  {#each { length: 7 }, i}
    <button type="button" class="tab" class:active={i === currentRoundIndex} onclick={() => currentRoundIndex = i}>Round {i + 1}</button>
  {/each}
</div>

<div class="tabs-content">
  <div class="form-group">
    <label for="description">Round notes</label>
    <p class="form-help" id="round-notes">
      Provide an optional short description on the current round, explaining options, expectations, and possible play styles.
    </p>
    <textarea class="form-textarea" value={roundInfos[currentRoundIndex]?.note || ""} name="round-notes" aria-describedby="round-notes"></textarea>
  </div>
</div>

<h2>Description</h2>

<div class="form-group">
  <p class="form-help" id="additional-notes">
    Explain your build in detail, going over playstyles, item order, possible deviations, and whatever else you might think of.
  </p>
  <textarea class="form-textarea form-textarea--large" value={description} name="additional-notes" aria-describedby="additional-notes"></textarea>
</div>

<style lang="scss">
  h2 {
    margin: 3rem 0 1rem;
  }

  .tabs {
    display: flex;
    gap: 0 1rem;
    padding: 0.5rem 1rem;
    background: $color-border;
    border-radius: $border-radius $border-radius 0 0;
  }

  .tab {
    padding: 0.5rem;
    border-radius: $border-radius-small;
    color: $color-text-alt;
    font-family: $font-stack-brand;
    font-size: $font-size-base;

    &:hover {
      color: $white;
    }

    &.active {
      background: $secondary;
      color: $white;
    }
  }

  .tabs-content {
    padding: 1.5rem;
    margin-bottom: 3rem;
    border: 1px solid $color-border;
  }
</style>
