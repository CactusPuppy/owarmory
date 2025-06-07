<script lang="ts">
  import type { FullItem as ItemType } from "$src/lib/types/build";
  import Item from "$src/lib/components/content/Item.svelte";
  import { getContext } from "svelte";
  import { type TalentFilterFn } from "../+layout.svelte";

  const { data } = $props();
  const { items } = $derived(data);

  const talentFilter = getContext("talentFilter") as TalentFilterFn<ItemType>;

  const groups = $derived.by(() => talentFilter(items));
</script>

{#each groups as [heroName, items] (heroName)}
  <h2>{heroName || "General"}</h2>

  <div class="grid">
    {#each items as item (item.id)}
      <div class="talent-container">
        <Item {item} full />
        <a href={`/admin/talents/items/${item.id}/edit`}>
          <button class="button edit-button"> Edit </button>
        </a>
      </div>
    {/each}
  </div>
{/each}

<style lang="scss">
  h2 {
    margin-top: $vertical-offset-large;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .talent-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .edit-button {
    width: 100%;
  }
</style>
