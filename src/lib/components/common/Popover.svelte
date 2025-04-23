<script lang="ts">
  import { fly } from "svelte/transition";

  const { children, content } = $props()

  let active = $state(false)
</script>

<div class="popover">
  <button
    class="toggle"
    onmouseenter={() => active = true}
    onmouseleave={() => active = false}
    onclick={() => active = !active}>
    {@render children()}
  </button>

  {#if active}
    <div class="content" transition:fly={{ y: 10, duration: 50 }}>
      {@render content()}
    </div>
  {/if}
</div>

<style lang="scss">
  .popover {
    display: inline-block;
    position: relative;
  }

  .toggle {
    appearance: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
  }

  .content {
    z-index: 10;
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    background: $color-bg-dark;
    border-radius: $border-radius;
    border-top: 2px solid $color-text-alt;
    border-bottom: 2px solid $color-text-alt;
  }
</style>
