<script lang="ts">
  import Heroes from "$lib/components/content/Heroes.svelte";
  import Power from "$lib/components/content/Power.svelte";
  import Item from "$lib/components/content/Item.svelte";
  import type { Item as ItemType, Power as PowerType } from "$src/generated/prisma";
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$src/lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { setContext } from "svelte";
  import { ItemRarity } from "$src/generated/prisma";
  import { ItemCategory } from "$src/generated/prisma";

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);

  // Placeholder stuff
  const items: ItemType[] = [
    {
      id: "a",
      name: "Some item",
      description: "I am some description of an item that will appear in the popover",
      iconURL: "https://picsum.photos/seed/a/40",
      rarity: ItemRarity.Common,
      cost: 4000,
      category: ItemCategory.Ability,
      heroName: null,
      removed: false,
    },
    {
      id: "b",
      name: "Some item",
      description: "I am some description of an item that will appear in the popover",
      iconURL: "https://picsum.photos/seed/b/40",
      rarity: ItemRarity.Rare,
      cost: 2000,
      category: ItemCategory.Survival,
      heroName: null,
      removed: false,
    },
    {
      id: "c",
      name: "Some item",
      description: "I am some description of an item that will appear in the popover",
      iconURL: "https://picsum.photos/seed/c/40",
      rarity: ItemRarity.Epic,
      cost: 4000,
      category: ItemCategory.Weapon,
      heroName: null,
      removed: false,
    },
  ];

  const powers: PowerType[] = [
    {
      id: "a",
      name: "Some power",
      description: "I am some description of a power that will appear in the popover",
      iconURL: "https://picsum.photos/40",
      removed: false,
    },
  ];
</script>

<Heroes />

<BuildsList header="Popular Builds" />
<BuildsList header="Latest Builds" />

<div class="block vertical-offset-large">
  <p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
  </p>

  <div class="list">
    {#each items as item (item.id)}
      <Item {item} />
    {/each}
  </div>

  <div class="list">
    {#each powers as power (power.id)}
      <Power {power} />
    {/each}
  </div>
</div>

<style lang="scss">
  .list {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>
