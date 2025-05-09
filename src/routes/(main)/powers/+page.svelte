<script lang="ts">
  import type { Power as PowerType } from "$src/generated/prisma/client.js";
  import Power from "$src/lib/components/content/Power.svelte";

  const { data } = $props();
  const { powers } = $derived(data);

  // ChatGPT special; group powers by hero and sort to put null first
  const groups = $derived.by(() => {
    const groups = new Map<string, PowerType[]>();

    for (const power of powers) {
      const key = power.heroName;
      if (!groups.has(key)) groups.set(key, []);

      groups.get(key)?.push(power);
    }

    // Sort to put null first
    const sortedGroups = [...groups.entries()].sort(([a], [b]) => {
      if (a === null) return -1;
      if (b === null) return 1;
      return a.localeCompare(b);
    });

    return sortedGroups;
  });
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
