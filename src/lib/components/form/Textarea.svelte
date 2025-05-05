<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    value?: string | null;
    id: string;
    label: string;
    children: Snippet;
  }

  let { value = $bindable(), id, label, children }: Props = $props();
</script>

<div class="form-group">
  <label class="form-label" for={id}>{label}</label>

  <p class="form-help" id="{id}-help">
    {@render children()}
  </p>

  <textarea {id} name={id} aria-describedby="{id}-help" class="form-textarea" bind:value></textarea>
</div>
