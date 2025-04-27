<script lang="ts">
  import type { Snippet } from "svelte";
  import "$lib/scss/global.scss";

  const { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <title>OW Armory - Overwatch Stadium Builds</title>
</svelte:head>

{@render children()}
