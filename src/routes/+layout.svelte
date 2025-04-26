<script lang="ts">
  import type { Snippet } from "svelte";
  import "$lib/scss/global.scss";

  const { children }: { children: Snippet } = $props();
</script>

{@render children()}
