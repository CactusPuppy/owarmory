<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    header: Snippet
    children: Snippet
    outline?: boolean
    onclick?: () => void
  }

  const { header, children, outline = false, onclick = () => null }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="card" class:outline {onclick}>
  <div class="header">
    {@render header()}
  </div>

  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .card {
    position: relative;
    display: grid;
    grid-template-rows: 3.5rem auto;
    border-radius: $border-radius;
    background: $color-border;
    box-shadow: inset 0 0 1px $color-text-alt;
    padding: 0 0.85rem 0.5rem;
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 0.35rem;
      top: 20%;
      bottom: 20%;
      left: 0;
      border-radius: 0 $border-radius $border-radius 0;
      box-shadow: 0 0 1px $color-text-alt;
      background: $color-bg-dark;
    }

    &::after {
      left: auto;
      right: 0;
      border-radius: $border-radius 0 0 $border-radius;
    }

    &.outline {
      outline-offset: 5px;
      outline: 2px solid $primary;
      box-shadow: none;
    }
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: $font-stack-brand;
    color: $white;
    font-size: 115%;
  }

  .content {
    background: $color-bg-dark;
    border-radius: $border-radius-small;
    padding: 1rem;
  }
</style>
