<script lang="ts">
  import Power from "../content/Power.svelte";

  interface Props {
    currentlySelected: unknown | null;
    previouslySelected: unknown[];
    onclick: (item?: unknown) => void;
  }

  const { currentlySelected = null, previouslySelected = [], onclick = () => null }: Props = $props();

  function generateFakePower() {
    return {
      id: Math.random(),
      name: "Some power",
      description: "Some power description",
      icon: `https://picsum.photos/seed/${Math.floor(Math.random() * 50)}/40`,
      rarity: "power",
      cost: 0,
    };
  }

  $inspect(previouslySelected)
</script>

<div class="block">
  <h3>Powers</h3>

  <div class="powers">
    {#each { length: 12 }}
      {@const power = generateFakePower()}
      {@const owned = previouslySelected.some(i => i.id === power.id)}
      {@const highlighted = currentlySelected?.id === power.id}

      <div
        class="power"
        class:owned
        class:highlighted>
        <Power {power} {onclick} />
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
