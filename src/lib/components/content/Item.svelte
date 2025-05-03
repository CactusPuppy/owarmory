<script lang="ts">
  import type { Item } from "$src/generated/prisma";
  import Card from "../common/Card.svelte";
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  interface Props {
    // This item should include the StatMod and Stat include
    item: Item;
    large?: boolean;
    full?: boolean;
    sold?: boolean;
    onclick?: (item: Item) => void;
  }

  const { item, sold = false, full = false, large = false, onclick = () => null }: Props = $props();

  const { name, description, iconURL, rarity, cost, statMods } = $derived(item);
</script>

{#if full}
  <Card>
    {#snippet header()}
      <div class="item {rarity}">
        <img src={iconURL} alt={name} />
      </div>

      {name}
    {/snippet}

    <SharedDetail {description} {cost} {statMods} />
  </Card>
{:else}
  <Popover onclick={() => onclick(item)}>
    <div class="item {rarity.toLowerCase()}" class:large class:sold>
      <img src={iconURL} alt={name} />
    </div>

    {#snippet content()}
      <SharedDetail {name} {description} {cost} {statMods} />
    {/snippet}
  </Popover>
{/if}

<style lang="scss">
  @use "sass:color";

  .item {
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

    @each $rarity, $color in $color-rarities {
      &.#{$rarity} {
        --color-rarity: #{$color};
      }
    }

    &.large {
      width: $item-size-large;
      height: $item-size-large;
    }

    img {
      width: calc(100% - 0.25rem);
      height: auto;
    }

    &.sold {
      img {
        filter: grayscale(100%);
      }
    }
  }
</style>
