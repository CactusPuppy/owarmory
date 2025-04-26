<script lang="ts">
  interface Props {
    label: string;
    suffix: string;
    value: number;
    max: number;
    icon: string;
    background?: string;
  }

  const { label, suffix, value, max, icon, background = "" }: Props = $props();
</script>

<div class="statistic">
  <div class="bar" aria-label="{label}: {value}{suffix}">
    <div class="icon">
      <img src={icon} alt={label} height="24" width="24" />
    </div>

    <div class="progress" style:width="{(100 / max) * value}%" style:background></div>
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
    border: 2px solid color.adjust($white, $lightness: -10%);
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
