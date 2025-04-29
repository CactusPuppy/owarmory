<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import { testBuildData } from "$lib/data/testData";
  import type { FullStadiumBuild } from "$lib/types/build";

  const build: FullStadiumBuild = testBuildData;
</script>

<svelte:head>
  <title>Edit "{build.buildTitle}" | OW Armory</title>
</svelte:head>

<h1 class="title">Edit "{build.buildTitle}"</h1>

<form>
  <BuildForm {build} heroEditable={false} />
</form>
