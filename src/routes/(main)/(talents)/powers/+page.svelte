<script lang="ts">
  import type { Power as PowerType } from "$src/generated/prisma/client.js";
  import Power from "$src/lib/components/content/Power.svelte";
  import { getContext } from "svelte";

  const { data } = $props();
  const { powers } = $derived(data);

  const talentFilter: (talents: Power[]) => void = getContext("talentFilter");

  const groups = $derived.by(() => talentFilter<PowerType[]>(powers));
</script>

<h1>All powers</h1>

{#each groups as [heroName, powers] (heroName)}
  <h2>{heroName}</h2>

  <div class="grid">
    {#each powers as power (power.id)}
      <Power {power} full />
    {/each}
  </div>
{/each}

<style lang="scss">
  h1 {
    margin-top: 0;
  }

  h2 {
    margin-top: $vertical-offset-large;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>
