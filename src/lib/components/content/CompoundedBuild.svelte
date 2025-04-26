<script lang="ts">
  import type { Build } from "$lib/types/build";
  import { getBuildFinalPowers, getBuildFinalItems } from "$lib/utils/build";
  import DashedHeader from "./DashedHeader.svelte";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";

  interface Props {
    build: Build
  }

  const { build }: Props = $props();

  const powers = $derived(getBuildFinalPowers(build));
  const items = $derived(getBuildFinalItems(build));
</script>

<DashedHeader text="Powers" />

<div class="grid">
  {#each powers as power (power.id)}
    <Power {power} large />
  {/each}
</div>

<DashedHeader text="Items" />

<div class="grid items">
  {#each items as item (item.id)}
    <Item {item} large />
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
</style>
