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
    <!-- Temporarily only showing 1 section -->
    {#each sections.slice(0, 1) as { id, power, items } (id)}
      <div class="section">
        {#if power}
          <Power {power} full outline />
        {/if}

        {#each items as item (item.id)}
          <Item {item} full />
        {/each}
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
  h2 {
    margin: 0 0 var(--gap);
    font-size: $font-size-h3;
  }

  .round-info {
    --gap: 1rem;
    margin: calc(var(--gap) * 2) 0 0;

    &:first-child {
      margin-top: 0;
    }
  }

  .section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .note {
    margin: var(--gap) 0 0;
  }
</style>
