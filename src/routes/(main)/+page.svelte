<script lang="ts">
  import Heroes from "$lib/components/content/Heroes.svelte";
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { setContext } from "svelte";
  import type { Snapshot } from "./$types";
  import type { FullStadiumBuild as Build } from "$lib/types/build";
  import { api } from "$lib/utils/api";
  import type { PageableBuildsSnapshot } from "$src/lib/types/snapshot";
  import TalentsNavigation from "$lib/components/content/TalentsNavigation.svelte";
  import { BUILDS_PAGE_SIZE } from "$lib/constants/page";

  const { data } = $props();

  const currentRound: CurrentRound = $state({ value: ROUND_MAX });
  const metaDescription =
    "Find and create Overwatch 2 Stadium builds for your favorite hero. Discover new stategies, share your knowledge, and stay on top of the latest meta builds.";

  let latestBuilds: Build[] = $state(data?.latestBuilds ?? []);
  let loading = $state(false);
  let currentPage = $state(1);

  setContext("currentRound", currentRound);

  export const snapshot: Snapshot<PageableBuildsSnapshot> = {
    capture: () => ({ builds: latestBuilds, currentPage, scrollPosition: window.scrollY }),
    restore: ({ builds: storedLatesteBuilds, currentPage: storedCurrentPage, scrollPosition }) => {
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
      const result = (await api<Build[]>("/builds/latest", { page: currentPage.toString() })) || [];

      latestBuilds.push(...result);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      loading = false;
      currentPage++;
    }
  }
</script>

<svelte:head>
  <title>OW Armory - Overwatch Stadium Builds</title>
  <meta property="og:title" content="OW Armory - Overwatch Stadium Builds" />
  <meta property="og:description" content={metaDescription} />
  <meta name="description" content={metaDescription} />
</svelte:head>

<Heroes />

<TalentsNavigation />

<BuildsList header="Latest Builds" builds={latestBuilds} />

{#if latestBuilds?.length % BUILDS_PAGE_SIZE === 0}
  <center>
    <a
      href="/latest?page={currentPage + 1}"
      class="button"
      class:disabled={loading}
      onclick={loadMoreLatestBuilds}
    >
      {#if loading}
        Loading...
      {:else}
        Load more
      {/if}
    </a>
  </center>
{/if}
