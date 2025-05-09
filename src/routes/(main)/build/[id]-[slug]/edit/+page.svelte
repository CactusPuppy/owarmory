<script lang="ts">
  import BuildForm from "$lib/components/form/BuildForm.svelte";
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();

  const { build, availableTalents, tags } = $derived(data);
</script>

<svelte:head>
  <title>Edit "{build.buildTitle}" | OW Armory</title>
</svelte:head>

<h1 class="title">Edit "{build.buildTitle}"</h1>

<BuildForm {availableTalents} {tags} {build} method="PATCH" heroEditable={false} />
