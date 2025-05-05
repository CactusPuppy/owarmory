<script lang="ts">
  import { setContext } from "svelte";

  const { children } = $props();

  function setTalentFilter<T extends { heroName?: string | null }>(talents: T[]) {
    const groups = new Map<string | null, T[]>();

    for (const talent of talents) {
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

{@render children()}
