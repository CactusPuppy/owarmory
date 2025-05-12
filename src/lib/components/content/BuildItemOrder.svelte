<script lang="ts">
  import type { BuildData } from "$lib/types/build";
  import { getAllBuildItems, isItemPreviouslyOwned } from "$lib/utils/build";
  import Item from "./Item.svelte";
  import iconChevronRight from "$lib/images/icons/chevron-right.svg";

  interface Props {
    build: BuildData;
  }

  const { build }: Props = $props();

  const items = $derived(getAllBuildItems(build));
</script>

<h2>Item purchase order</h2>

<div class="items">
  {#each items as item, i (i + item.id)}
    {@const sold = isItemPreviouslyOwned(items.slice(0, i), item)}

    <div class="cell">
      <Item {item} {sold} />

      {#if i < items.length - 1}
        <img src={iconChevronRight} width="18" height="18" alt="" />
      {/if}
    </div>
  {:else}
    <p class="placeholder"><i>No items purchased yet...</i></p>
  {/each}
</div>

<style lang="scss">
  h2 {
    margin: 0 0 1rem;
    font-size: $font-size-h3;
  }

  img {
    opacity: 0.5;
  }

  .items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.75rem;
    border-radius: $border-radius-small;
    background: $color-bg-dark;
  }

  .placeholder {
    margin: 0;
    opacity: 0.75;
    font-size: 0.8em;
  }

  .cell {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
