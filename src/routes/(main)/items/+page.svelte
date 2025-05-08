<script lang="ts">
  import type { FullItem as ItemType } from "$src/lib/types/build.js";
  import Item from "$src/lib/components/content/Item.svelte";

  const { data } = $props();
  const { items } = $derived(data);

  // ChatGPT special; group items by hero and sort to put null first
  const groups = $derived.by(() => {
    const groups = new Map<string | null, ItemType[]>();

    for (const item of items) {
      const key = item.heroName ?? null;
      if (!groups.has(key)) groups.set(key, []);

      groups.get(key)?.push(item);
    }

    // Sort to put null first
    const sortedGroups = [...groups.entries()].sort(([a], [b]) => {
      if (a === null) return -1;
      if (b === null) return 1;
      return a.localeCompare(b);
    });

    return sortedGroups;
  });
</script>

<h1>All items</h1>

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
