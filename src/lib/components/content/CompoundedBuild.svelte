<script lang="ts">
  import type { BuildData } from "$src/lib/types/build";
  import type { CurrentRound } from "$lib/types/round";
  import { getBuildPowersForRound, getBuildItemsForRound } from "$lib/utils/build";
  import { getContext } from "svelte";
  import DashedHeader from "./DashedHeader.svelte";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";
  import { scale } from "svelte/transition";

  interface Props {
    build: BuildData;
    large?: boolean;
  }

  const { build, large = true }: Props = $props();

  const currentRound: CurrentRound = getContext("currentRound");

  const powers = $derived(getBuildPowersForRound(build, currentRound.value));
  const items = $derived(getBuildItemsForRound(build, currentRound.value));
</script>

<DashedHeader text="Powers" />

<div class="grid">
  {#each powers as power (power.id)}
    <div class="cell" in:scale={{ duration: 50, start: 0.75 }}>
      <Power {power} {large} />
    </div>
  {/each}

  {#each { length: 4 - powers.length }}
    <div class="cell">
      <div class="empty"></div>
    </div>
  {/each}
</div>

<DashedHeader text="Items" />

<div class="grid items" class:large>
  {#each items as item, index (item.id)}
    <div class="cell" in:scale={{ duration: 50, start: 0.75 }} class:warn={index >= 6}>
      <Item {item} {large} />
    </div>
  {/each}

  {#each { length: 6 - items.length }}
    <div class="cell">
      <div class="empty item"></div>
    </div>
  {/each}
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    gap: 0.5rem 0;

    @include breakpoint(tablet) {
      gap: 0.5rem;

      &.large {
        gap: 1rem;
      }
    }

    &.items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      @include breakpoint(tablet) {
        gap: 1rem;

        &.large {
          gap: 2rem;
        }
      }
    }

    &.large {
      gap: 1rem 0;
    }
  }

  .cell {
    display: flex;
    justify-content: center;

    &.warn :global(.item .icon) {
      outline: 2px solid $red;
      outline-offset: 2px;
    }
  }

  .empty {
    --power-size: #{$item-size};
    --item-size: #{$item-size};
    width: var(--power-size);
    height: var(--power-size);
    background: $color-bg-dark;
    border-radius: $border-radius;
    border: 2px solid $color-border;

    &.item {
      width: var(--item-size);
      height: var(--item-size);
      border-radius: 50%;
    }

    .large & {
      --power-size: #{$power-size-large};
      --item-size: #{$item-size-large};
    }
  }
</style>
