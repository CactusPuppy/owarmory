<script lang="ts">
  import Heroes from "$lib/components/content/Heroes.svelte";
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { setContext } from "svelte";
  import { testBuildData } from "$lib/data/testData";
  import type { Snapshot } from "./$types.js";
  import type { Build } from "$lib/types/build.js";
  import { api } from "$lib/utils/api";

  const { data } = $props();

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  let latestBuilds: Build[] = $state(data.latestBuilds);
  let loading = $state(false);
  let currentPage = $state(1);

  setContext("currentRound", currentRound);

  export const snapshot: Snapshot<{ latestBuilds: Build[]; currentPage: number; scrollPosition: number }> = {
    capture: () => ({ latestBuilds, currentPage, scrollPosition: window.scrollY }),
    restore: ({ latestBuilds: storedLatesteBuilds, currentPage: storedCurrentPage, scrollPosition }) => {
      latestBuilds = storedLatesteBuilds;
      currentPage = storedCurrentPage;

      requestAnimationFrame(() => window.scrollTo(scrollX, scrollPosition));
    },
  };

  async function loadMoreLatestBuilds(event: MouseEvent): Promise<void> {
    event.preventDefault();

    if (loading) return;

    loading = true;

    try {
      await new Promise((res) => setTimeout(res, 500)); // Fake load times

      const result = (await api<Build[]>(`builds/latest?page=${currentPage}`)) || [];

      latestBuilds.push(...result);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      loading = false;
      currentPage++;
    }
  }
</script>

<Heroes />

<BuildsList header="Popular Builds" builds={[testBuildData, testBuildData, testBuildData]} />

<BuildsList header="Latest Builds" builds={latestBuilds} />

<center>
  <a href="/latest?page={currentPage + 1}" class="button" class:disabled={loading} onclick={loadMoreLatestBuilds}>
    {#if loading}
      Loading...
    {:else}
      Load more
    {/if}
  </a>
</center>
