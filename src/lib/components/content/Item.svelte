<script lang="ts">
  import type { Item } from "$src/generated/prisma";
  import Card from "../common/Card.svelte";
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  interface Props {
    item: Item;
    large?: boolean;
    full?: boolean;
    sold?: boolean;
    onclick?: (item: Item) => void;
  }

  const { item, sold = false, full = false, large = false, onclick = () => null }: Props = $props();

  const { name, description, iconURL, rarity, cost } = $derived(item);
</script>

{#if full}
  <Card>
    {#snippet header()}
      <div class="item {rarity}">
        <img src={iconURL} alt={name} />
      </div>

      {name}
    {/snippet}

    <SharedDetail {description} {cost} />
  </Card>
{:else}
  <Popover onclick={() => onclick(item)}>
    <div class="item {rarity}" class:large class:sold>
      <img src={iconURL} alt={name} />
    </div>

    {#snippet content()}
      <SharedDetail {name} {description} {cost} />
    {/snippet}
  </Popover>
{/if}

<style lang="scss">
  @use "sass:color";

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: $item-size;
    height: $item-size;
    overflow: hidden;
    padding: 0.25rem;
    border: 2px solid var(--color-rarity);
    box-shadow: inset 0 0 0 1px $color-bg-base;
    background: var(--color-rarity);

    @each $rarity, $color in $color-rarities {
      &.#{$rarity} {
        --color-rarity: #{$color};

        &:hover {
          --color-rarity: #{color.adjust($color, $lightness: 10%)};
        }
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
