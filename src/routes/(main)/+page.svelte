<script lang="ts">
  import Heroes from "$lib/components/content/Heroes.svelte";
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { setContext } from "svelte";
  import { testBuildData } from "$lib/data/testData";
  import type { Snapshot } from "./$types";
  import type { FullStadiumBuild as Build } from "$lib/types/build";
  import { api } from "$lib/utils/api";

  const { data } = $props();

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  let latestBuilds: Build[] = $state(data.latestBuilds);
  let loading = $state(false);

  setContext("currentRound", currentRound);

  export const snapshot: Snapshot<{ latestBuilds: Build[]; scrollPosition: number }> = {
    capture: () => ({ latestBuilds, scrollPosition: window.scrollY }),
    restore: ({ latestBuilds: storedLatesteBuilds, scrollPosition }) => {
      latestBuilds = storedLatesteBuilds;

      requestAnimationFrame(() => window.scrollTo(scrollX, scrollPosition));
    },
  };

  async function loadMoreLatestBuilds(): Promise<void> {
    loading = true;

    try {
      await new Promise((res) => setTimeout(res, 500)); // Fake load times

      const result = (await api<Build[]>("builds/latest")) || [];

      latestBuilds.push(...result);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>OW Armory - Overwatch Stadium Builds</title>
</svelte:head>

<Heroes />

<BuildsList header="Popular Builds" builds={[testBuildData, testBuildData, testBuildData]} />

<BuildsList header="Latest Builds" builds={latestBuilds} />

<center>
  <button class="button" disabled={loading} onclick={loadMoreLatestBuilds}>
    {#if loading}
      Loading...
    {:else}
      Load more
    {/if}
  </button>
</center>
