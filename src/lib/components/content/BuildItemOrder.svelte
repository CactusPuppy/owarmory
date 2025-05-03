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
      <div class="item" class:sold>
        <Item {item} />

        {#if sold}
          <div class="label">Sell</div>
        {/if}
      </div>

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
    padding: 0.75rem;
    border-radius: $border-radius-small;
    background: $color-bg-dark;
  }

  .cell {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .item {
    position: relative;
    border-radius: 50%;

    &.sold {
      outline: 2px solid $red;
      outline-offset: 2px;

      :global(.item) {
        filter: saturate(0);
      }
    }
  }

  .label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateY(50%) translateX(-50%);
    border-radius: $border-radius-small;
    background: $red;
    color: $white;
    font-family: $font-stack-brand;
    font-size: 75%;
    line-height: 1;
    padding: 0.25rem 0.35rem;
    pointer-events: none;
  }
</style>
