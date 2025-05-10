<script lang="ts">
  import { page } from "$app/state";
  import { scale } from "svelte/transition";

  const { path = "" } = $props();

  const fullPath = $derived(page.url.origin + path);

  let showSuccess = $state(false);

  function selectAll(event: FocusEvent) {
    (event.target as HTMLInputElement).select();
  }

  function copy() {
    navigator.clipboard.writeText(fullPath);

    showSuccess = true;
    setTimeout(() => (showSuccess = false), 500);
  }
</script>

<label class="form-label" for="share">Share</label>

<div class="form-group">
  <input type="text" class="form-input" id="share" readonly value={fullPath} onfocus={selectAll} />

  <button class="button button--secondary" onclick={copy}>
    Copy

    {#if showSuccess}
      <div class="success" transition:scale={{ duration: 100, start: 0.75 }}>Copied!</div>
    {/if}
  </button>
</div>

<style lang="scss">
  .form-group {
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    background: $color-bg-light;
    border-radius: $border-radius-small;
  }

  .form-input {
    padding: 0.5rem 0 0.5rem 0.5rem;
    font-size: $font-size-small;
  }

  .button {
    position: relative;
  }

  .success {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: $border-radius-small * 0.5;
    background: $green;
    color: $white;
  }
</style>
