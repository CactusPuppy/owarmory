<script lang="ts">
  import { slide } from "svelte/transition";

  interface Props {
    issues: string[];
  }

  const { issues = [] }: Props = $props();
</script>

<div class="form-error" in:slide={{ duration: 300 }}>
  <strong>Error(s) when saving</strong>

  <ul>
    {#each issues as issue, i (i)}
      <li>{issue.toString()}</li>
    {/each}
  </ul>
</div>

<style lang="scss">
  ul {
    margin: 1rem 0 0;
  }
</style>
