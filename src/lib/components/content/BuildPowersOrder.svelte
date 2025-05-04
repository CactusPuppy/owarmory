<script lang="ts">
  import type { BuildData } from "$lib/types/build";
  import iconChevronRight from "$lib/images/icons/chevron-right.svg";
  import Power from "./Power.svelte";
  import { ROUND_MAX } from "$src/lib/constants/round";

  interface Props {
    build: BuildData;
  }

  const { build }: Props = $props();
</script>

<h2>Power selection order</h2>

<div class="powers">
  {#each { length: Math.ceil(ROUND_MAX / 2) }, i (i)}
    {@const power = build.roundInfos[i * 2].sections[0].power}
    <div class="item">
      {#if power}
        <Power {power} />
      {:else}
        <p class="missing-power">?</p>
      {/if}

      {#if i < Math.ceil(ROUND_MAX / 2) - 1}
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
    padding: 0.75rem;
    border-radius: $border-radius-small;
    background: $color-bg-dark;
  }

  .missing-power {
    margin-top: 0;
    margin-bottom: 0;
    aspect-ratio: 1;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 0.5rem;
    border: 2px solid $color-text-base;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
