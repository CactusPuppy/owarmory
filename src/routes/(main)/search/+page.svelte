<script lang="ts">
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import { ROUND_MAX } from "$lib/constants/round";
  import type { CurrentRound } from "$lib/types/round";
  import { setContext } from "svelte";

  const { data } = $props();

  const { builds, query } = $derived(data);

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);
</script>

<BuildsList header="Search results for &quot;{query}&quot;" {builds} />
