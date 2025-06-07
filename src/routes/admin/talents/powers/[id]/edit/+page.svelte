<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Power } from "$src/generated/prisma/client.js";

  const { data, form } = $props();
  const { power }: { power: Power } = data;
</script>

<h1>Editing {power.name}</h1>

<form method="POST" use:enhance>
  {#if form?.success}
    <p class="success">power updated successfully</p>
  {/if}
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  <label class="form-label">
    Name
    <input name="name" type="text" class="form-input" value={power.name} />
  </label>

  <label class="form-label">
    Is Removed
    <input name="removed" type="checkbox" checked={power.removed} />
  </label>

  <label class="form-label">
    Icon URL
    <input name="iconURL" type="text" class="form-input" value={power.iconURL ?? ""} />
  </label>

  <label class="form-label">
    Description
    <textarea name="description" value={power.description} class="form-textarea"></textarea>
  </label>

  <button class="button" type="submit">Save</button>
</form>

<style lang="scss">
  @use "sass:color";
  form {
    & > label {
      margin-bottom: 1rem;
    }
  }

  .success {
    background-color: $green;
    color: $white;
    font-weight: bold;
    padding: 1em;
    border-radius: $border-radius-small;
  }
  .error {
    background-color: $red;
    color: $white;
    font-weight: bold;
    padding: 1em;
    border-radius: $border-radius-small;
  }
</style>
