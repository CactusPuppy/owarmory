<script lang="ts">
  import { tick } from "svelte";
  import { closeable } from "$lib/actions/closeable";
  import { fly } from "svelte/transition";

  const { children, content } = $props();

  let active = $state(false);
  let element: HTMLElement | null = $state(null);
  let offset = $state(0);

  $effect(() => {
    if (active) positionPopover();
  });

  async function positionPopover(): Promise<void> {
    if (!element) return;

    offset = 0;

    await tick();

    const { left, right } = element.getBoundingClientRect();
    const gap = parseInt(getComputedStyle(document.documentElement).fontSize);

    if (left - gap < 0) offset = left - gap;
    else if (right - window.innerWidth + gap > 0) offset = right - window.innerWidth + gap;
  }
</script>

<div class="popover">
  <button
    class="toggle"
    onmouseenter={() => (active = true)}
    onmouseleave={() => (active = false)}
    onclick={() => (active = !active)}
    use:closeable={{ onclose: () => (active = false) }}
  >
    {@render children()}
  </button>

  {#if active}
    <div
      class="content"
      transition:fly={{ y: 10, duration: 50 }}
      bind:this={element}
      style:--offset="{offset}px"
    >
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
    left: calc(50% - var(--offset));
    transform: translateX(-50%) translateY(100%);
    background: $color-bg-dark;
    border-radius: $border-radius;
    border-top: 2px solid $color-text-alt;
    border-bottom: 2px solid $color-text-alt;
  }
</style>
