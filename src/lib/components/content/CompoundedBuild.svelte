<script lang="ts">
  import type { FullStadiumBuild } from "$src/lib/types/build";
  import type { CurrentRound } from "$lib/types/round";
  import { getBuildPowersForRound, getBuildItemsForRound } from "$lib/utils/build";
  import { getContext } from "svelte";
  import DashedHeader from "./DashedHeader.svelte";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";
  import { scale } from "svelte/transition";

  interface Props {
    build: FullStadiumBuild;
  }

  const { build }: Props = $props();

  const currentRound: CurrentRound = getContext("currentRound");

  const powers = $derived(getBuildPowersForRound(build, currentRound.value));
  const items = $derived(getBuildItemsForRound(build, currentRound.value));
</script>

<DashedHeader text="Powers" />

<div class="grid">
  {#each powers as power (power.id)}
    <div in:scale={{ duration: 50, start: 0.75 }}>
      <Power {power} large />
    </div>
  {/each}

  {#each { length: 4 - powers.length }}
    <div class="empty"></div>
  {/each}
</div>

<DashedHeader text="Items" />

<div class="grid items">
  {#each items as item (item.id)}
    <div in:scale={{ duration: 50, start: 0.75 }}>
      <Item {item} large />
    </div>
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
