<script lang="ts">
  import type { Build } from "$lib/types/build";
  import Heroes from "$lib/components/content/Heroes.svelte";
  import type { HeroData } from "$lib/types/hero";
  import ItemsGrid from "./ItemsGrid.svelte";
  import Item from "../content/Item.svelte";

  interface Props {
    activeItems: unknown[];
    disabledItems: unknown[];
  }

  const { activeItems = [], disabledItems = [] }: Props = $props();

  const itemRarities = ["common", "rare", "epic"];

  function generateFakeItem(rarity = "") {
    return {
      id: Math.random(),
      name: "Some item",
      description: "Some item description",
      icon: `https://picsum.photos/seed/${Math.floor(Math.random() * 50)}/40`,
      rarity,
      cost: 2000
    };
  }
</script>

<div class="rows">
  {#each itemRarities as rarity (rarity)}
    <div class="row {rarity}">
      <h3>{rarity}</h3>

      <div class="items">
        {#each { length: 10 }}
          <div class="item">
            <Item item={generateFakeItem(rarity)} large />
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
</style>
