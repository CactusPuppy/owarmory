<script lang="ts">
  import { type Snippet } from "svelte";
  import "$lib/scss/global.scss";
  import type { LayoutData } from "./$types";

  const { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>OW Armory - Overwatch Stadium Builds</title>
</svelte:head>

{#key data.currentUser}
  {@render children()}
{/key}
