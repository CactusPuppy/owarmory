<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import type { Build } from "$lib/types/build";
  import { heroes } from "$src/lib/constants/heroData";

  const build: Build = {
    buildTitle: "",
    author: "",
    heroName: heroes[0].name,
    roundInfos: []
  };
</script>

<svelte:head>
  <title>Create new build | OW Armory</title>
</svelte:head>

<h1 class="title">Create new build</h1>

<form>
  <BuildForm {build} />
</form>
