<script lang="ts">
  import { closeable } from "$lib/actions/closeable";
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";

  interface Props {
    children: Snippet;
    content: Snippet;
    onclick?: () => void
  }

  const { children, content, onclick = () => null }: Props = $props();

  let active = $state(false);

  function click() {
    active = !active;
    onclick();
  }
</script>

<div class="popover">
  <button
    type="button"
    class="toggle"
    onmouseenter={() => (active = true)}
    onmouseleave={() => (active = false)}
    onclick={click}
    use:closeable={{ onclose: () => active = false }}
  >
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
    position: relative;
  }

  .toggle {
    display: block;
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
