<script lang="ts">
  import Item from "../content/Item.svelte";

  interface Props {
    selected: unknown[];
    previouslySelected: unknown[];
    onclick: (item?: unknown) => void;
  }

  const { selected = [], previouslySelected = [], onclick = () => null }: Props = $props();

  const itemRarities = ["common", "rare", "epic"];

  $inspect('previouslySelected', previouslySelected);

  function generateFakeItem(rarity = "") {
    return {
      id: Math.random(),
      name: "Some item",
      description: "Some item description",
      icon: `https://picsum.photos/seed/${Math.floor(Math.random() * 50)}/40`,
      rarity,
      cost: 2000,
    };
  }

  function isCurrentlyOwned(item: number): boolean {
    const numberOfTimesInteractedWithItem = previouslySelected.filter(i => i.id === item.id);

    if (!numberOfTimesInteractedWithItem?.length) return false;

    console.log('interacted with', numberOfTimesInteractedWithItem.length, numberOfTimesInteractedWithItem.length % 2);

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
          {@const sellable = isCurrentlyOwned(item)}
          {@const active = selected.find(i => i.id === item.id)}

          <div class="cell">
            <div
              class="item"
              class:active
              class:sellable>
              <Item {item} {onclick} large />

              {#if sellable}
                <div class="label" class:active>
                  {#if sellable && active}
                    Sold
                  {:else}
                    Sell
                  {/if}
                </div>
              {/if}
            </div>
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
    display: flex;
    justify-content: center;
  }

  .item {
    position: relative;
    border-radius: 50%;

    &.sellable {
      &:hover {
        outline: 5px solid $red;
        outline-offset: 5px;
      }

      :global(.item) {
        opacity: 0.5;
        filter: saturate(0);
      }
    }

    &.active {
      outline: 5px solid $primary;
      outline-offset: 5px;

      &:hover {
        outline: 5px solid $primary;
      }
    }
  }

  .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: $border-radius-small;
    background: $red;
    color: $white;
    font-family: $font-stack-brand;
    padding: 0.25rem 0.5rem;
    pointer-events: none;

    &.active {
      background: $secondary;
    }
  }
</style>
