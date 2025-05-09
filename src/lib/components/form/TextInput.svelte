<script lang="ts">
  import { validateLength, type ValidateLengthProps } from "$src/lib/actions/validateLength";

  interface Props {
    value?: string | null;
    id: string;
    label: string;
    large?: boolean;
    lengthValidation?: ValidateLengthProps;
  }

  let { value = $bindable(), id, label, large = false, lengthValidation = {} }: Props = $props();
</script>

<div class="form-group">
  <label class="form-label" for={id}>{label}</label>

  <input
    type="text"
    class="form-input"
    class:form-input--large={large}
    bind:value
    use:validateLength={lengthValidation}
    name={id}
    {id}
  />
</div>
