<script lang="ts">
  import {
    buildSegments,
    CHUNK_SIZE,
    segementTotalHealth,
    segmentToBackground,
    type SegmentData,
  } from "$src/lib/utils/healthbar";
  import Popover from "../common/Popover.svelte";

  interface Props {
    label: string;
    description?: string;
    icon: string;
    health: number;
    armor: number;
    shields: number;
  }

  const { label, description, icon, health, armor, shields }: Props = $props();

  // Calculate total points and number of chunks
  const totalPoints = $derived(health + armor + shields);

  // Build the bar segments
  const segments: SegmentData[] = $derived(buildSegments(health, armor, shields));

  function parseDescription(text: string): string {
    let output = wrapBracketsWithMark(text);
    output = wrapNumbersWithMark(output);

    return output;
  }

  /** Replace [word] with <mark>[word]</mark> */
  function wrapBracketsWithMark(text: string): string {
    return text.replace(/\[[^\]]+\]/g, (match) => `<mark>${match}</mark>`);
  }

  /** Replace 10, 10%, 10s, and 10m with <mark>{match}<mark> */
  function wrapNumbersWithMark(text: string): string {
    return text.replace(/\d+(?:\.\d+)?(?:%|s|m)?/g, "<mark>$&</mark>");
  }
</script>

<div class="statistic">
  <div class="bar" aria-label="{label}: {totalPoints}">
    <div class="icon">
      <Popover>
        <img src={icon} alt={label} height="24" width="24" />

        {#snippet content()}
          <div class="detail">
            <strong class="stat-name">{label}</strong>

            {#if description}
              <!-- eslint-disable-next-line svelte/no-at-html-tags This should be safe: the input is determined by us. -->
              <p class="description">{@html parseDescription(description)}</p>
            {/if}
          </div>
        {/snippet}
      </Popover>
    </div>

    <div class="bar-container">
      {#each segments as seg, i (i)}
        <div
          class="segment"
          style="
            background: {segmentToBackground(seg)};
            flex-grow: {segementTotalHealth(seg) / CHUNK_SIZE};
          "
        ></div>
      {/each}
    </div>
  </div>

  <div class="value">
    {totalPoints}
  </div>
</div>

<style lang="scss">
  @use "sass:color";

  $icon-width: 2.5rem;
  $gap: 3px;

  .stat-name {
    padding-bottom: 1rem;
    display: block;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba($color-text-alt, 0.35);
    color: $color-text-titles;
    font-size: 1.2em;
    line-height: 1.1;
    font-weight: bold;
    font-family: $font-stack-brand;
  }

  .description {
    margin: 0;
    padding: 0;
    color: $color-text-alt;
    font-size: $font-size-small;
    line-height: 1.5;

    :global(mark) {
      background: transparent;
      color: $white;
    }
  }

  .bar-container {
    display: flex;
    gap: 2px;
    overflow: hidden;
    padding: 0.25rem;
  }

  .segment {
    border-radius: $border-radius-xxs;
  }

  .statistic {
    display: grid;
    grid-template-columns: auto $icon-width;
    align-items: center;
  }

  .bar {
    display: grid;
    grid-template-columns: $icon-width auto;
    gap: $gap;
    padding: $gap;
    border-radius: $border-radius-small;
    background: $color-bg-dark;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: $icon-width;
    border-radius: $border-radius-small * 0.75;
    background: color.adjust($color-bg-base, $lightness: 5%, $saturation: -20%);

    img {
      font-size: 0;
    }
  }

  .value {
    text-align: right;
    font-size: 1rem;
    font-weight: bold;
    font-family: $font-stack-brand;
  }
</style>
