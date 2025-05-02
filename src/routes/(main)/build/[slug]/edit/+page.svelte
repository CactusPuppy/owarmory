<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import { setAvailableTalentsContext } from "$src/lib/contexts/availableTalentsContext";
  import { getBuildContext } from "$src/lib/contexts/buildContext";
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();

  const { availableTalents } = data;
  setAvailableTalentsContext(availableTalents);

  const build = getBuildContext();
</script>

<svelte:head>
  <title>Edit "{build.buildTitle}" | OW Armory</title>
</svelte:head>

<h1 class="title">Edit "{build.buildTitle}"</h1>

<BuildForm {build} method="PATCH" heroEditable={false} />
