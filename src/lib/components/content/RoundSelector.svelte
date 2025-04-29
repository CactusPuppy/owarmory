<script lang="ts">
  import { ROUND_MAX, ROUND_MIN } from "$lib/constants/round";
  import type { CurrentRound } from "$lib/types/round";
  import { getContext } from "svelte";

  // The round is passed via a context state rune. This is done to prevent having to pass the round
  // down through many components if the components happens to be quite deep.
  const currentRound: CurrentRound = getContext("currentRound");

  function setCurrentRound(incrementor: 1 | -1): void {
    if (!currentRound) {
      console.error("No round was passed as context");
      return;
    }

    currentRound.value = Math.min(Math.max(currentRound.value + incrementor, ROUND_MIN), ROUND_MAX);
  }
</script>

<div class="round-selector">
  <button
    class="control"
    disabled={currentRound.value === ROUND_MIN}
    onclick={() => setCurrentRound(-1)}
  >
    &lt;
  </button>

  <span>
    {#if currentRound.value < ROUND_MAX}
      Round <em>{currentRound.value}</em>
    {:else}
      Final build
    {/if}
  </span>

  <button
    class="control"
    disabled={currentRound.value === ROUND_MAX}
    onclick={() => setCurrentRound(1)}
  >
    &gt;
  </button>
</div>

<style lang="scss">
  $control-size: 2rem;

  // Force monospace size to prevent text from jumping around between different rounds
  em {
    font-variant-numeric: tabular-nums;
    font-style: normal;
  }

  .round-selector {
    display: grid;
    grid-template-columns: $control-size 8rem $control-size;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $secondary;
    font-family: $font-stack-brand;
  }

  .control {
    height: $control-size;
    width: $control-size;
    border: 2px solid $color-border;
    box-shadow: inset 0 0 0 1px $color-bg-base;
    border-radius: $border-radius-small;
    background: $color-border;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
    transition:
      opacity 100ms,
      color 100ms;

    &[disabled] {
      opacity: 0.35;
      color: $color-text-alt;
    }
  }
</style>
