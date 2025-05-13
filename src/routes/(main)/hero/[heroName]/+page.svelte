<script lang="ts">
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { setContext } from "svelte";
  import type { Snapshot } from "./$types";
  import type { FullStadiumBuild as Build } from "$lib/types/build";
  import { api } from "$lib/utils/api";
  import type { PageableBuildsSnapshot } from "$src/lib/types/snapshot";
  import { BUILDS_PAGE_SIZE } from "$lib/constants/page";

  const { data } = $props();

  const { heroName } = $derived(data);
  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  let builds: Build[] = $state(data?.builds ?? []);
  let loading = $state(false);
  let currentPage = $state(1);

  setContext("currentRound", currentRound);

  export const snapshot: Snapshot<PageableBuildsSnapshot> = {
    capture: () => ({ builds, currentPage, scrollPosition: window.scrollY }),
    restore: ({ builds: storedLatestBuilds, currentPage: storedCurrentPage, scrollPosition }) => {
      builds = storedLatestBuilds;
      currentPage = storedCurrentPage;

      requestAnimationFrame(() => window.scrollTo(scrollX, scrollPosition));
    },
  };

  async function loadMoreBuilds(event: MouseEvent): Promise<void> {
    event.preventDefault();

    if (loading) return;

    loading = true;

    try {
      const result =
        (await api<Build[]>(`/builds/hero/${heroName}`, { page: currentPage.toString() })) || [];

      builds.push(...result);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      loading = false;
      currentPage++;
    }
  }
</script>

<svelte:head>
  <title>{heroName} | OW Armory</title>
</svelte:head>

<BuildsList header="Builds for {heroName}" {builds} />

{#if builds.length % BUILDS_PAGE_SIZE === 0}
  <center>
    <a
      href="/user/{heroName}?page={currentPage + 1}"
      class="button"
      class:disabled={loading}
      onclick={loadMoreBuilds}
    >
      {#if loading}
        Loading...
      {:else}
        Load more
      {/if}
    </a>
  </center>
{/if}
