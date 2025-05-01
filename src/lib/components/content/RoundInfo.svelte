<script lang="ts">
  import type { FullRoundInfo } from "$lib/types/round";
  import Item from "./Item.svelte";
  import Power from "./Power.svelte";

  interface Props {
    roundInfo: FullRoundInfo;
    header: string;
  }

  const { roundInfo, header = "" }: Props = $props();

  const { note, sections } = $derived(roundInfo);
</script>

<div class="round-info">
  <h2>{header}</h2>

  <div class="sections">
    {#each sections as { id, title, power, soldItems, purchasedItems } (id)}
      <div class="section">
        <div class="section__title">
          {#if title}
            <strong>Alternative</strong> - <em>{title}</em>
          {:else}
            <strong>Standard</strong>
          {/if}
        </div>

        <div class="section__items">
          {#if power}
            <Power {power} />
          {/if}

          {#each soldItems as item (item.id)}
            <Item {item} sold />
          {/each}

          {#each purchasedItems as item (item.id)}
            <Item {item} />
          {/each}
        </div>
      </div>
    {/each}
  </div>

  {#if note}
    <p class="note">
      {note}
    </p>
  {/if}
</div>

<style lang="scss">
  .round-info {
    --gap: 1rem;
    margin: calc(var(--gap) * 2) 0 0;

    &:first-child {
      margin-top: 0;
    }
  }

  h2 {
    margin: 0 0 var(--gap);
    font-size: $font-size-h3;
  }

  .sections {
    display: grid;
    gap: var(--gap);

    @include breakpoint(tablet) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .section {
    border: 1px solid $color-border;
    border-radius: $border-radius;
  }

  .section__title {
    padding: 0.25rem 1rem;
    background: $color-border;
    border-radius: $border-radius $border-radius 0 0;
    color: $white;
    font-size: $font-size-small;
  }

  .section__items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
  }

  .note {
    margin: var(--gap) 0 0;
  }
</style>
