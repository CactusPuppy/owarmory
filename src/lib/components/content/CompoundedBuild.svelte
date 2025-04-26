<script lang="ts">
  import type { Build } from "$lib/types/build";
  import { getBuildPowersForRound, getBuildItemsForRound } from "$lib/utils/build";
  import DashedHeader from "./DashedHeader.svelte";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";

  interface Props {
    build: Build
  }

  const { build }: Props = $props();

  const powers = $derived(getBuildPowersForRound(build));
  const items = $derived(getBuildItemsForRound(build));
</script>

<DashedHeader text="Powers" />

<div class="grid">
  {#each powers as power (power.id)}
    <Power {power} large />
  {/each}

  {#each { length: 4 - powers.length }}
    <div class="empty"></div>
  {/each}
</div>

<DashedHeader text="Items" />

<div class="grid items">
  {#each items as item (item.id)}
    <Item {item} large />
  {/each}

  {#each { length: 6 - items.length }}
    <div class="empty item"></div>
  {/each}
</div>

<style lang="scss">
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    &.items {
      gap: 2rem;
    }
  }

  .empty {
    width: $power-size-large;
    height: $power-size-large;
    background: $color-bg-dark;
    border-radius: $border-radius;
    border: 2px solid $color-border;

    &.item {
      width: $item-size-large;
      height: $item-size-large;
      border-radius: 50%;
    }
  }
</style>
