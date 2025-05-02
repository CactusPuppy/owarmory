<script lang="ts">
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { getContext, setContext } from "svelte";
  import type { User } from "$src/generated/prisma";
  import LogoutButton from "$lib/components/content/auth/LogoutButton.svelte";
  import type { Snapshot } from "./$types";
  import type { FullStadiumBuild as Build } from "$lib/types/build";
  import { api } from "$src/lib/utils/api";

  const { data } = $props();

  const currentUser: User = getContext("currentUser");
  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);

  let latestBuilds: Build[] = $state(data.latestUserBuilds);
  let page: number = $state(0);
  let loading = $state(false);

  setContext("currentRound", currentRound);

  export const snapshot: Snapshot<{ latestBuilds: Build[]; scrollPosition: number; page: number }> =
    {
      capture: () => ({ latestBuilds, scrollPosition: window.scrollY, page }),
      restore: ({ latestBuilds: storedLatesteBuilds, scrollPosition, page: storedPage }) => {
        latestBuilds = storedLatesteBuilds;
        page = storedPage;

        requestAnimationFrame(() => window.scrollTo(scrollX, scrollPosition));
      },
    };

  async function loadMoreLatestBuilds(): Promise<void> {
    loading = true;

    try {
      const result =
        (await api<Build[]>("builds/user", { userId: currentUser.id, page: page.toString() })) ||
        [];

      latestBuilds.push(...result);
      page += 1;
    } catch (error: unknown) {
      console.error(error);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Account | {currentUser.username} | OW Armory</title>
</svelte:head>

<header class="header">
  <h1>Hey, {currentUser.username}</h1>

  <LogoutButton />
</header>

<BuildsList header="Your Builds" builds={latestBuilds} />

<center>
  <button class="button" disabled={loading} onclick={loadMoreLatestBuilds}>
    {#if loading}
      Loading...
    {:else}
      Load more
    {/if}
  </button>
</center>

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
