<script lang="ts">
  import type { BuildData } from "$lib/types/build";
  import { getBuildPowersForRound } from "$lib/utils/build";
  import iconChevronRight from "$lib/images/icons/chevron-right.svg";
  import Power from "./Power.svelte";

  interface Props {
    build: BuildData;
  }

  const { build }: Props = $props();

  const powers = $derived(getBuildPowersForRound(build, 7));
</script>

<h2>Power selection order</h2>

<div class="powers">
  {#each powers as power, i (i + power.id)}
    <div class="item">
      <Power {power} />

      {#if i < powers.length - 1}
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

  .powers {
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
