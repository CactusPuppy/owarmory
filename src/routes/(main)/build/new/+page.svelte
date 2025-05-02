<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import { heroes } from "$src/lib/constants/heroData";
  import type { FlatFullStadiumBuild } from "$src/lib/types/build";
  import { redirect } from "@sveltejs/kit";
  import { getContext } from "svelte";

  const currentUser = getContext("currentUser");
  if (!currentUser) redirect(307, "/");

  const build: FlatFullStadiumBuild = {
    buildTitle: "",
    heroName: heroes[0].name,
    roundInfos: [],
  };
</script>

<svelte:head>
  <title>Create new build | OW Armory</title>
</svelte:head>

<h1 class="title">Create new build</h1>

<BuildForm {build} method="POST" />
