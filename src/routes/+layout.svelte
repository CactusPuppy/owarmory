<script lang="ts">
  import { type Snippet } from "svelte";
  import "$lib/scss/global.scss";
  import type { PageData } from "./$types";

  const { data, children }: { data: PageData; children: Snippet } = $props();
</script>

{#key data.currentUser}
  {@render children()}
{/key}
