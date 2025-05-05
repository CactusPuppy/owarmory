<script lang="ts">
  interface Props {
    value?: string | null;
    id: string;
    label: string;
    large?: boolean;
  }

  let { value = $bindable(), id, label, large = false }: Props = $props();
</script>

<div class="form-group">
  <label class="form-label" for={id}>{label}</label>

  <input type="text" class="form-input" class:form-input--large={large} bind:value name={id} {id} />
</div>
