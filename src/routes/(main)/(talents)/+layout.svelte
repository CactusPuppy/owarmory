<script module>
  export type TalentFilterFn<T> = (talents: T[]) => [string | null, T[]][];
</script>

<script lang="ts">
  import { page } from "$app/state";
  import TalentsNavigation from "$lib/components/content/TalentsNavigation.svelte";
  import { setContext } from "svelte";

  const { children } = $props();

  const label = $derived(page.url.pathname.split("/")[1]);

  let query = $state("");

  function setTalentFilter<T extends { heroName?: string | null }>(talents: T[]) {
    const groups = new Map<string | null, T[]>();

    for (const talent of talents) {
      // Search the full talent object, matching on anything inside it.
      if (!JSON.stringify(talent).toLowerCase().includes(query.toLowerCase())) continue;

      const key = talent.heroName ?? null;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(talent);
    }

    const sortedGroups = [...groups.entries()].sort(([a], [b]) => {
      if (a === null) return -1;
      if (b === null) return 1;
      return a.localeCompare(b);
    });

    return sortedGroups;
  }

  setContext("talentFilter", setTalentFilter);
</script>

<h1>All {label}</h1>

<div class="navigation">
  <TalentsNavigation />
</div>

<input
  type="text"
  class="form-input form-input--large"
  placeholder="Search all {label}..."
  bind:value={query}
/>

{#key query}
  {@render children()}
{/key}

<style lang="scss">
  h1 {
    margin: 0;
  }

  .navigation {
    margin: 2rem 0 1rem;

    @include breakpoint(tablet) {
      margin-top: 3rem;
    }
  }
</style>
