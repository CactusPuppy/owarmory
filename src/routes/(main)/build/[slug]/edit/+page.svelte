<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import { testBuildData } from "$lib/data/testData";
  import type { Build } from "$lib/types/build";

  const build: Build = testBuildData;
</script>

<svelte:head>
  <title>Edit "{build.title}" | OW Armory</title>
</svelte:head>

<h1 class="title">Edit "{build.title}"</h1>

<form>
  <BuildForm {build} heroEditable={false} />
</form>
