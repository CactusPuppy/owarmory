<script lang="ts">
  import type { FullItem } from "$src/lib/types/build";
  import Card from "../common/Card.svelte";
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  interface Props {
    // This item should include the StatMod and Stat include
    item: FullItem;
    large?: boolean;
    full?: boolean;
    sold?: boolean;
    onclick?: (item: FullItem) => void;
  }

  const { item, sold = false, full = false, large = false, onclick = () => null }: Props = $props();

  const { name, description, iconURL, rarity, cost, category, statMods, removed } = $derived(item);
  const imageSize = $derived(large ? 80 : 40);
</script>

{#if full}
  <Card>
    {#snippet header()}
      <div class="item {rarity.toLowerCase()}" class:sold>
        <div class="icon">
          <img src={iconURL} alt={name} loading="lazy" />
        </div>
      </div>

      {name}
    {/snippet}

    {#if sold}
      <div class="sold-overlay">Sell</div>
    {/if}

    <SharedDetail {description} {category} {cost} {statMods} {removed} />
  </Card>
{:else}
  <Popover onclick={() => onclick(item)}>
    <div class="item {rarity.toLowerCase()}" class:large class:sold>
      <div class="icon">
        <img src={iconURL} alt={name} height={imageSize} loading="lazy" />
      </div>

      {#if sold}
        <div class="label">Sell</div>
      {/if}
    </div>

    {#snippet content()}
      <SharedDetail {name} {description} {category} {cost} {statMods} {removed} isPopover={true} />
    {/snippet}
  </Popover>
{/if}

<style lang="scss">
  @use "sass:color";

  .item {
    position: relative;

    @each $rarity, $color in $color-rarities {
      &.#{$rarity} {
        --color-rarity: #{$color};
      }
    }
  }

  .icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: $item-size;
    height: $item-size;
    overflow: hidden;
    border: 2px solid var(--color-rarity);
    background: var(--color-rarity);

    &:hover {
      filter: brightness(1.2);
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      border: 2px solid $color-bg-base;
    }

    .large & {
      width: $item-size-large;
      height: $item-size-large;
    }

    .sold & {
      --color-rarity: #{$red};
      background: transparent;

      img {
        filter: grayscale(100%);
        border-radius: 50%;
      }
    }

    img {
      width: calc(100% - 0.25rem);
      height: auto;
    }
  }

  .label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateY(50%) translateX(-50%);
    border-radius: $border-radius-small;
    background: $red;
    color: $white;
    font-family: $font-stack-brand;
    font-size: 85%;
    line-height: 1;
    padding: 0.25rem 0.35rem;
    pointer-events: none;
  }

  .sold-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: $border-radius;
    background: rgba(color.adjust($red, $lightness: -20%, $saturation: -20%), 0.5);
    backdrop-filter: saturate(0);
    box-shadow: inset 0 0 0 2px $red;
    z-index: 2;
    pointer-events: none;
    font-family: $font-stack-brand;
    font-size: 125%;
    color: $red;
  }
</style>
