<script lang="ts">
  import BuildsList from "$lib/components/content/BuildsList.svelte";
  import type { CurrentRound } from "$lib/types/round";
  import { ROUND_MAX } from "$lib/constants/round";
  import { getContext, setContext } from "svelte";
  import type { User } from "$src/generated/prisma";
  import LogoutButton from "$lib/components/content/auth/LogoutButton.svelte";

  const currentUser: User = getContext("currentUser");
  const currentRound: CurrentRound = $state({ value: ROUND_MAX });

  setContext("currentRound", currentRound);
</script>

<svelte:head>
  <title>Account | {currentUser.username} | OW Armory</title>
</svelte:head>

<header class="header">
  <h1>Hey, {currentUser.username}</h1>

  <LogoutButton />
</header>

<BuildsList header="Your Builds" />

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
