<script lang="ts">
  import Popover from "../common/Popover.svelte";

  interface Props {
    label: string;
    suffix: string;
    description?: string;
    value: number;
    max: number;
    icon: string;
  }

  const { label, description, suffix, value, max, icon }: Props = $props();

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
  <div class="bar" aria-label="{label}: {value}{suffix}">
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

    <div class="progress" style:width="{(100 / max) * value}%"></div>
  </div>

  <div class="value">
    {value}{suffix}
  </div>
</div>

<style lang="scss">
  @use "sass:color";

  $icon-width: 2.5rem;
  $gap: 3px;

  .statistic {
    display: grid;
    grid-template-columns: auto $icon-width;
    align-items: center;
  }

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

  .progress {
    background: linear-gradient(
      to bottom,
      color.adjust($white, $lightness: -10%),
      color.adjust($white, $lightness: -15%)
    );
    box-shadow: inset 0 0 0 2px color.adjust($white, $lightness: -10%);
    border-radius: $border-radius-small;
    transition: width 500ms;
  }

  .value {
    text-align: right;
    font-size: 1rem;
    font-weight: bold;
    font-family: $font-stack-brand;
  }
</style>
