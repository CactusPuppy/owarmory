<script lang="ts">
  import { tick } from "svelte";
  import { closeable } from "$lib/actions/closeable";
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";

  interface Props {
    children: Snippet;
    content: Snippet;
    inline?: boolean;
    transition?: boolean;
    onclick?: () => void;
    onshow?: () => void;
  }

  const {
    children,
    content,
    inline = false,
    transition = true,
    onclick = () => null,
    onshow = () => null,
  }: Props = $props();

  let active = $state(false);
  let element: HTMLElement | null = $state(null);
  let offset = $state(0);
  let flip = $state(false);

  $effect(() => {
    if (active) {
      onshow();
      positionPopover();
    }
  });

  async function positionPopover(): Promise<void> {
    if (!element) return;

    offset = 0;
    flip = false;

    await tick();

    const { left, right, top } = element.getBoundingClientRect();
    const gap = parseInt(getComputedStyle(document.documentElement).fontSize);

    if (left - gap < 0) offset = left - gap;
    else if (right - window.innerWidth + gap > 0) offset = right - window.innerWidth + gap;

    flip = top + element.clientHeight > window.innerHeight;
  }

  function click() {
    active = !active;
    onclick();
  }
</script>

<div class="popover" class:inline>
  <button
    type="button"
    class="toggle"
    class:inline
    onmouseenter={() => (active = true)}
    onmouseleave={() => (active = false)}
    onclick={click}
    use:closeable={{ onclose: () => (active = false) }}
  >
    {@render children()}
  </button>

  {#if active}
    <div
      class="content"
      class:flip
      transition:fly={{ y: flip ? -10 : 10, duration: transition ? 50 : 0 }}
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

  // This exists to hide the popover while the it calculates if it should
  // open to the bottom or to the top.
  @keyframes show {
    to {
      opacity: 1;
    }
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
    padding: 1.5rem;
    width: min(calc(100vw - 2rem), 23rem);
    opacity: 0;
    animation: show 0ms 10ms forwards;

    &.flip {
      top: -1rem;
      bottom: auto;
      transform: translateX(-50%) translateY(-100%);
    }
  }

  .inline {
    display: inline;
  }
</style>
