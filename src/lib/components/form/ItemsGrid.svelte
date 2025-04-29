<script lang="ts">
  import Item from "../content/Item.svelte";

  interface Props {
    currentlySelected: unknown[];
    previouslySelected: unknown[];
    onclick: (item?: unknown) => void;
  }

  const { currentlySelected = [], previouslySelected = [], onclick = () => null }: Props = $props();

  const itemRarities = ["common", "rare", "epic"];

  function generateFakeItem(rarity = "") {
    return {
      id: Math.random(),
      name: "Some item",
      description: "Some item description",
      icon: `https://picsum.photos/seed/${Math.floor(Math.random() * 50)}/40`,
      rarity,
      cost: Math.ceil(Math.random() * 15) * 100,
    };
  }

  function isCurrentlyOwned(item: number): boolean {
    const numberOfTimesInteractedWithItem = previouslySelected.filter(i => i.id === item.id);

    if (!numberOfTimesInteractedWithItem?.length) return false;

    return numberOfTimesInteractedWithItem.length % 2 !== 0;
  }
</script>

<div class="rows">
  {#each itemRarities as rarity (rarity)}
    <div class="row {rarity}">
      <h3>{rarity}</h3>

      <div class="items">
        {#each { length: 10 }}
          {@const item = generateFakeItem(rarity)}
          {@const owned = isCurrentlyOwned(item)}
          {@const active = currentlySelected.some(i => i.id === item.id)}

          <div class="cell" class:active class:owned>
            <div class="item">
              <Item {item} {onclick} large />
            </div>

            <div class="cost">
              {#if owned}
                {#if owned && active}
                  Sold
                {:else}
                  Owned
                {/if}
              {:else}
                {#if active}
                  Purchased
                {:else}
                  ${item.cost.toLocaleString()}
                {/if}
              {/if}
            </div>

            {#if owned && !active}
              <div class="label">
                Sell
              </div>
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
    background: $color-bg-dark;
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
