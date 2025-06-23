<script module>
  export type TalentFilterFn<T> = (talents: T[]) => [string | null, T[]][];
</script>

<script lang="ts">
  import TalentsNavigation from "$lib/components/content/TalentsNavigation.svelte";
  import { transliterate } from "$src/lib/utils/string";
  import { setContext } from "svelte";

  const { children } = $props();

  const label = "talents";

  let query = $state("");

  function setTalentFilter<T extends { heroName?: string | null }>(talents: T[]) {
    const groups = new Map<string | null, T[]>();

    for (const talent of talents) {
      // Search the full talent object, matching on anything inside it.
      if (!matchQuery(JSON.stringify(talent))) continue;

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

  function matchQuery(talentString: string): boolean {
    const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);

    return queryWords.every((word) => transliterate(talentString.toLowerCase()).includes(word));
  }

  setContext("talentFilter", setTalentFilter);
</script>

<h1>All {label}</h1>

<div class="navigation">
  <TalentsNavigation prefix="/admin/talents" />
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
