<script lang="ts">
  import type { Build } from "$lib/types/build";
  import { getAllBuildItems } from "$lib/utils/build";
  import Item from "./Item.svelte";
  import iconChevronRight from "$lib/images/icons/chevron-right.svg";

  interface Props {
    build: Build
  }

  const { build }: Props = $props();

  const items = $derived(getAllBuildItems(build));
</script>

<h2>Item purchase order</h2>

<div class="items">
  {#each items as item, i (item.id)}
    <div class="item">
      <Item {item} />

      {#if i < items.length - 1}
        <img src={iconChevronRight} width="18" height="18" alt="" />
      {/if}
    </div>
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
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
