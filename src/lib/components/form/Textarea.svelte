<script lang="ts">
  import { validateLength, type ValidateLengthProps } from "$src/lib/actions/validateLength";
  import type { Snippet } from "svelte";

  interface Props {
    value?: string | null;
    id: string;
    label: string;
    lengthValidation?: ValidateLengthProps;
    children: Snippet;
  }

  let { value = $bindable(), id, label, lengthValidation = {}, children }: Props = $props();
</script>

<div class="form-group">
  <label class="form-label" for={id}>{label}</label>

  <p class="form-help" id="{id}-help">
    {@render children()}
  </p>

  <textarea
    {id}
    name={id}
    aria-describedby="{id}-help"
    class="form-textarea"
    bind:value
    use:validateLength={lengthValidation}
  ></textarea>
</div>
