<script lang="ts">
  import Power from "../content/Power.svelte";
  import type { Power as PowerType } from "$src/generated/prisma";

  interface Props {
    availablePowers: PowerType[];
    currentlySelected: PowerType | null;
    previouslySelected: PowerType[];
    filtered: PowerType[];
    onclick: (item: PowerType) => void;
  }

  const {
    availablePowers = [],
    currentlySelected = null,
    previouslySelected = [],
    filtered = [],
    onclick = () => null,
  }: Props = $props();
</script>

<div class="block">
  <h3>Powers</h3>

  <div class="powers">
    {#each availablePowers as power (power.id)}
      {@const owned = previouslySelected.some((i) => i.id === power.id)}
      {@const highlighted = currentlySelected?.id === power.id}
      {@const faded = !filtered.some((i) => i.id == power.id)}

      <div class="power" class:owned class:highlighted class:faded>
        <Power {power} {onclick} full />
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
    background: color.adjust($color-bg-dark, $lightness: 1%);
    border: 2px solid $primary;
  }

  .powers {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .power {
    position: relative;
    border-radius: $border-radius-small;
    outline-offset: 0.25rem;
    height: 100%;
    cursor: pointer;

    &:hover {
      outline: 2px solid $secondary;
    }

    &.owned {
      filter: saturate(0);
      opacity: 0.5;
    }

    &.highlighted {
      outline: 2px solid $primary;
    }

    &.faded {
      opacity: 0.25;
    }
  }
</style>
