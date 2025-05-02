<script lang="ts">
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { getContext, setContext } from "svelte";
  import type { User } from "$src/generated/prisma";
  import type { Snapshot } from "./$types";
  import type { FullStadiumBuild as Build } from "$lib/types/build";
  import { api } from "$src/lib/utils/api";
  import { SignOut } from "@auth/sveltekit/components";
  import { BUILDS_PAGE_SIZE } from "$src/lib/types/page";
  import type { PageableBuildsSnapshot } from "$src/lib/types/snapshot";

  const { data } = $props();

  const currentUser: User = getContext("currentUser");
  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);

  let latestBuilds: Build[] = $state(data.latestUserBuilds);
  let currentPage: number = $state(0);
  let loading = $state(false);

  setContext("currentRound", currentRound);

  export const snapshot: Snapshot<PageableBuildsSnapshot> = {
    capture: () => ({ builds: latestBuilds, scrollPosition: window.scrollY, currentPage }),
    restore: ({ builds: storedLatestBuilds, scrollPosition, currentPage: storedCurrentPage }) => {
      latestBuilds = storedLatestBuilds;
      currentPage = storedCurrentPage;

      requestAnimationFrame(() => window.scrollTo(scrollX, scrollPosition));
    },
  };

  async function loadMoreLatestBuilds(): Promise<void> {
    loading = true;

    try {
      const result =
        (await api<Build[]>(`/builds/user/${currentUser.id}`, {
          page: currentPage.toString(),
        })) || [];

      latestBuilds.push(...result);
      currentPage += 1;
    } catch (error: unknown) {
      console.error(error);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Account | {currentUser.name} | OW Armory</title>
</svelte:head>

<header class="header">
  <h1>Hey, {currentUser.name}</h1>

  <SignOut>
    {#snippet submitButton()}
      <div class="button">Sign out</div>
    {/snippet}
  </SignOut>
</header>

<BuildsList header="Your Builds" builds={latestBuilds} />

{#if latestBuilds.length % BUILDS_PAGE_SIZE === 0}
  <center>
    <button class="button" disabled={loading} onclick={loadMoreLatestBuilds}>
      {#if loading}
        Loading...
      {:else}
        Load more
      {/if}
    </button>
  </center>
{/if}

<style lang="scss">
  h1 {
    margin: 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    @include breakpoint(tablet) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
