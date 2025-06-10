<script lang="ts">
  import RandomizerIcon from "$lib/images/randomizer.png";
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

<div class="randomizer-notif">
  <a href="/randomizer" target="_blank">
    <img src={RandomizerIcon} alt="OW Armory randomizer icon" height="125" />
  </a>
  <div>
    <h3>Looking to spice up your Stadium experience?</h3>
    <p>
      The <strong>OW Armory Randomizer</strong> is a place where a roll of the dice determines what powers
      and items you purchase. Do you have the skills and courage to break from the meta builds and adapt
      your playstyle?
    </p>
    <button class="button">Roll into the Randomizer</button>
  </div>
</div>
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

<style lang="scss">
  .randomizer-notif {
    gap: 1.5rem;
    align-items: center;
    margin-top: $vertical-offset-md;
    margin-bottom: calc($vertical-offset-md - $vertical-offset-large);
    padding: $gutter;
    border: 2px solid $color-text-alt;
    border-radius: $border-radius;

    @include breakpoint(mobile) {
      display: flex;
    }

    a {
      display: flex;
      align-self: center;
      justify-content: center;
      margin-bottom: 1rem;

      @include breakpoint(mobile) {
        margin-bottom: 0;
      }
    }

    h3 {
      margin-bottom: 0;
      margin-top: 0;
    }

    b {
      color: $color-bg-hero;
    }

    p {
      color: $color-text-alt;
    }
  }
</style>
