<script lang="ts">
  import ClosureNotification from "$src/lib/components/ClosureNotification.svelte";
  import DeleteBuild from "$src/lib/components/form/DeleteBuild.svelte";
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();

  const { build } = $derived(data);
</script>

<svelte:head>
  <title>Edit "{build.buildTitle}" | OW Armory</title>
</svelte:head>

<h1 class="title">Edit "{build.buildTitle}"</h1>

<!-- <BuildForm {availableTalents} {tags} {build} method="PATCH" heroEditable={false} /> -->
<ClosureNotification />
<div class="spacer"></div>
<DeleteBuild {build} />

<style lang="scss">
  .spacer {
    height: 2lh;
  }
</style>
