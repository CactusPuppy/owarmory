<script lang="ts">
  import WarningIcon from "$lib/images/icons/warning.svelte";
  import IconChevronRight from "$lib/images/icons/chevron-right.svelte";
  let showFullWarning = $state(false);

  const { full = false }: { full?: boolean } = $props();
</script>

<button class="removal-warning" onclick={() => (showFullWarning = !showFullWarning)}>
  <div class="icon">
    <WarningIcon />
  </div>
  <div class="warning">
    <p class="text-center"><em>Possibly Unavailable</em></p>
    {#if showFullWarning || full}
      <p>
        This item or power has been marked as unavailable. This might be due to the item being
        disabled temporarily, or it might be because the item has been permanently retired.
      </p>
      <p>
        Think this warning should be removed? Let us know on our <a
          href="https://discord.gg/JNCx6U3g9F"
          target="_blank"
          rel="noopener noreferrer">Discord</a
        >.
      </p>
    {/if}
    {#if !full}
      <div class={`chevron ${showFullWarning ? "open" : ""}`}>
        <IconChevronRight />
      </div>
    {/if}
  </div>
</button>

<style lang="scss">
  @use "sass:color";

  .removal-warning {
    color: $yellow;
    border: 1px solid $yellow;
    background-color: color.adjust(color.change($yellow, $alpha: 50%), $lightness: -15%);
    border-radius: $border-radius;
    padding: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;

    .icon {
      width: calc($item-size);
      height: calc($item-size);
    }

    .warning {
      // font-size: 0.8em;
      color: color.adjust($yellow, $saturation: 10%);
      flex: 1;

      p {
        text-align: left;
      }

      .text-center {
        text-align: center;
      }

      em {
        font-size: 1.25em;
        font-style: normal;
        font-weight: bold;
      }

      p:last-child {
        margin-bottom: 0;
      }

      a {
        font-weight: bold;
        color: inherit;
      }
    }

    .chevron {
      rotate: 90deg;

      &.open {
        rotate: -90deg;
      }
    }
  }
</style>
