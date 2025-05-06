<script lang="ts">
  import type { Power as PowerType } from "$src/generated/prisma/client.js";
  import Power from "$src/lib/components/content/Power.svelte";
  import { getContext } from "svelte";
  import { type TalentFilterFn } from "../+layout.svelte";

  const { data } = $props();
  const { powers } = $derived(data);

  const talentFilter = getContext("talentFilter") as TalentFilterFn<PowerType>;

  const groups = $derived.by(() => talentFilter(powers));
</script>

{#each groups as [heroName, powers] (heroName)}
  <h2>{heroName}</h2>

  <div class="grid">
    {#each powers as power (power.id)}
      <Power {power} full />
    {/each}
  </div>
{/each}

<style lang="scss">
  h2 {
    margin-top: $vertical-offset-large;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>
