<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import { setBuildContext } from "$src/lib/contexts/buildContext";

  const { data, children }: { data: LayoutData; children: Snippet } = $props();
  const { build } = data;

  setBuildContext(build);
</script>

{@render children()}
