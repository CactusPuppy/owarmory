<script lang="ts">
  import Power from "../content/Power.svelte";
  import type { Power as PowerType } from "$src/generated/prisma";
  import { getAvailableTalentsContext } from "$src/lib/contexts/availableTalentsContext";

  interface Props {
    currentlySelected: PowerType | null;
    previouslySelected: PowerType[];
    onclick: (item: PowerType) => void;
  }

  const availableTalents = getAvailableTalentsContext();
  const { powers: availablePowers } = availableTalents;

  const {
    currentlySelected = null,
    previouslySelected = [],
    onclick = () => null,
  }: Props = $props();
</script>

<div class="block">
  <h3>Powers</h3>

  <div class="powers">
    {#each availablePowers as power (power.id)}
      {@const owned = previouslySelected.some((i) => i.id === power.id)}
      {@const highlighted = currentlySelected?.id === power.id}

      <div class="power" class:owned class:highlighted>
        <Power {power} {onclick} large />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "sass:color";

  h3 {
    margin: 0 0 1rem;
    text-align: center;
    color: $primary;
  }

  .block {
    padding: 1rem;
    border-radius: $border-radius;
    background: $color-bg-dark;
    border: 2px solid $primary;
  }

  .powers {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  .power {
    position: relative;
    border-radius: $border-radius-small;
    outline-offset: 0.25rem;

    &.owned {
      filter: saturate(0);
      opacity: 0.5;
    }

    &.highlighted {
      outline: 2px solid $primary;
    }
  }
</style>
