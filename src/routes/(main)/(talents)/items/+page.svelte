<script lang="ts">
  import type { Item as ItemType } from "$src/generated/prisma/client.js";
  import Item from "$src/lib/components/content/Item.svelte";
  import { getContext } from "svelte";

  const { data } = $props();
  const { items } = $derived(data);

  const talentFilter: (talents: Item[]) => void = getContext("talentFilter");

  const groups = $derived.by(() => talentFilter<ItemType[]>(items));
</script>

{#each groups as [heroName, items] (heroName)}
  <h2>{heroName || "General"}</h2>

  <div class="grid">
    {#each items as item (item.id)}
      <Item {item} full />
    {/each}
  </div>
{/each}

<style lang="scss">
  h1 {
    margin-top: 0;
  }

  h2 {
    margin-top: $vertical-offset-large;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>
