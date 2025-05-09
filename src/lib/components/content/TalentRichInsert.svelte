<script lang="ts">
  import type { Item, Power } from "$src/generated/prisma";
  import { type FullItem } from "$src/lib/types/build";
  import { api } from "$src/lib/utils/api";
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  const { talentName } = $props();

  let apiPromise: Promise<Item | Power> | null = $state(null);

  function onshow() {
    if (apiPromise) return apiPromise;

    apiPromise = api<FullItem | Power>(`/talents/${talentName}`);
  }
</script>

<Popover inline {onshow} transition={false}>
  <span class="talent">
    <img src="/images/talents/{talentName}.png" alt="" height="16" width="16" />
    {talentName}
  </span>

  {#snippet content()}
    {#await apiPromise}
      Loading...
    {:then data}
      {#if !data}
        <em>Power or item not found.</em>
      {:else}
        {@const { name, description, cost, statMods } = data as FullItem}

        <SharedDetail {name} {description} {cost} {statMods} />
      {/if}
    {/await}
  {/snippet}
</Popover>

<style lang="scss">
  img {
    border-radius: $border-radius;
    outline: 1px solid $white;
    background: $color-bg-base;
    transform: scale(1.25) translateX(-50%);
    margin-right: -0.5rem;
  }

  .talent {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: $secondary;
    margin-left: 0.5rem;
    padding: 0 0.25rem;
    border-radius: 0.25rem;
    color: $white;
    font-weight: bold;
    font-size: $font-size-base;
    font-weight: normal;
    font-family: $font-stack;
  }
</style>
