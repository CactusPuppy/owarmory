<script lang="ts">
  import { markdown } from "$src/lib/utils/markdown";
  import TalentRichPreviews from "../content/TalentRichPreviews.svelte";

  const { value = $bindable(), children } = $props();
</script>

<div class="columns">
  <div class="input">
    {@render children()}
  </div>

  {#key value}
    <div class="preview markdown">
      <TalentRichPreviews text={markdown(value || "")} sanitized />
    </div>
  {/key}
</div>

<style lang="scss">
  .columns {
    display: grid;
    gap: 1rem;

    @include breakpoint(tablet) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .input {
    height: 100%;

    :global(> *) {
      height: 100%;
    }
  }

  .preview {
    padding: 1rem;
    border: 1px solid $color-border;
    border-radius: $border-radius-small;
    background: $color-bg-base;
  }
</style>
