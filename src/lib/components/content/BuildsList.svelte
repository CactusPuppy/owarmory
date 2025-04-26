<script lang="ts">
  import Build from "./Build.svelte";

  interface Props {
    header: string;
  }

  const { header }: Props = $props();
</script>

<h1>{header}</h1>

<div class="block list">
  <Build />
  <Build />
  <Build />
</div>

<style lang="scss">
  h1 {
    margin: $vertical-offset-large 0 1rem;
  }

  .list {
    display: grid;
    gap: 2rem;
  }
</style>
