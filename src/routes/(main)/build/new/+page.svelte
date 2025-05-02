<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import type { Item } from "$src/generated/prisma/client.js";
  import { heroes } from "$src/lib/constants/heroData";
  import { ROUND_MAX } from "$src/lib/constants/round.js";
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

  // Add empty roundInfos for each round
  for (let i = 0; i < ROUND_MAX; i++) {
    if (build.roundInfos![i]) continue;

    build.roundInfos![i] = {
      sections: [
        {
          title: "",
          power: null,
          purchasedItems: [] as Item[],
          soldItems: [] as Item[],
        },
      ],
      note: "",
    };
  }

  const { data } = $props();
  const { availableTalents } = data;
</script>

<svelte:head>
  <title>Create new build | OW Armory</title>
</svelte:head>

<h1 class="title">Create new build</h1>

<BuildForm {availableTalents} {build} method="POST" />
