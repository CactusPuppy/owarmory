<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import { heroes } from "$src/lib/constants/heroData";
  import type { FullStadiumBuild } from "$src/lib/types/build";

  let build: FullStadiumBuild = {
    buildTitle: "",
    author: "",
    heroName: heroes[0].name,
    roundInfos: [],
  };
</script>

<svelte:head>
  <title>Create new build | OW Armory</title>
</svelte:head>

<h1 class="title">Create new build</h1>

<BuildForm bind:build method="POST" />
