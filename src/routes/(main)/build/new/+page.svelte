<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import { heroes } from "$lib/constants/heroes";
  import type { Build } from "$lib/types/build";

  const build: Build = {
    title: "",
    author: "",
    hero: heroes[0],
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
