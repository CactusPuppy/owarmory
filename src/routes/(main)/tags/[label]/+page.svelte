<script lang="ts">
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import { ROUND_MAX } from "$lib/constants/round";
  import type { CurrentRound } from "$lib/types/round";
  import Tags from "$src/lib/components/content/Tags.svelte";
  import { setContext } from "svelte";

  const { data } = $props();

  const { builds, tags, label } = $derived(data);

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);
</script>

<Tags {tags} />

<BuildsList header="Builds tagged as &quot;{label}&quot;" {builds} />
