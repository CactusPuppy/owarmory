<script lang="ts">
  import Item from "../content/Item.svelte";
  import type { Item as ItemType } from "$src/generated/prisma";
  import { ItemRarity } from "$src/lib/types/build";
  import iconCurrency from "$lib/images/icons/currency.svg";

  interface Props {
    availableItems: ItemType[];
    currentlyPurchasing: ItemType[];
    currentlySelling: ItemType[];
    previouslySelected: ItemType[];
    onclick: (item: ItemType) => void;
  }
  const {
    availableItems = [],
    currentlyPurchasing = [],
    currentlySelling = [],
    previouslySelected = [],
    onclick = () => null,
  }: Props = $props();

  const itemRarities = Object.values(ItemRarity);

  function sortItems(a: ItemType, b: ItemType): number {
    // Hero specific items always come after general items
    if (a.heroName !== b.heroName) {
      return a.heroName ? 1 : -1;
    }

    // Sort by cost
    return a.cost - b.cost;
  }
</script>

<div class="rows">
  {#each itemRarities as rarity (rarity)}
    {@const items = availableItems.filter((item) => item.rarity === rarity).sort(sortItems)}

    <div class="row {rarity.toLowerCase()}">
      <h3>{rarity.toLowerCase()}</h3>

      <div class="items">
        {#each items as item (item.id)}
          {@const owned = previouslySelected.some((i) => i.id === item.id)}
          {@const buying = currentlyPurchasing.some((i) => i.id === item.id)}
          {@const selling = currentlySelling.some((i) => i.id == item.id)}

          <div class="cell" class:active={buying || selling} class:owned>
            <div class="item">
              <Item {item} {onclick} large />
            </div>

            <div class="cost">
              {#if owned}
                {#if owned && selling}
                  Sold
                {:else}
                  Owned
                {/if}
              {:else if buying}
                Purchased
              {:else}
                <img src={iconCurrency} alt="$" height="16" width="20" />
                {item.cost.toLocaleString()}
              {/if}
            </div>

            {#if owned && !selling}
              <div class="label">Sell</div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use "sass:color";

  h3 {
    margin: 0 0 1rem;
    color: var(--color-rarity);
    text-align: center;
  }

  .rows {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .row {
    padding: 1rem;
    border-radius: $border-radius;
    background: color.adjust($color-bg-dark, $lightness: 1%);
    border: 2px solid var(--color-rarity);

    @each $rarity, $color in $color-rarities {
      &.#{$rarity} {
        --color-rarity: #{$color};
      }
    }
  }

  .items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  .cell {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.25rem;
  }

  .item {
    border-radius: 50%;
    outline-offset: 0.25rem;

    &:hover {
      outline: 2px solid $secondary;
    }

    .owned & {
      &:hover {
        outline: 2px solid $red;
      }

      :global(.item) {
        opacity: 0.5;
        filter: saturate(0);
      }
    }

    .active & {
      outline: 2px solid $primary;

      &:hover {
        outline: 2px solid $primary;
      }
    }
  }

  .cost {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: $white;
    font-family: $font-stack-brand;
    font-size: $font-size-small;

    .owned & {
      color: $color-text-alt;
    }

    .active & {
      color: $primary;
    }
  }

  .label {
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: $border-radius-small;
    background: $red;
    color: $white;
    font-family: $font-stack-brand;
    padding: 0.25rem 0.5rem;
    pointer-events: none;
  }
</style>
