<script lang="ts">
  import { slide } from "svelte/transition";
  import ItemStastisticsBar from "./ItemStastisticsBar.svelte";

  // Hero will be used at some point for the health value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, hero } = $props();

  let expanded = $state(false);

  const statistics = $derived([
    {
      label: "Health",
      suffix: "",
      value: 300,
      max: 300,
      icon: "https://picsum.photos/seed/a/40",
      background: "linear-gradient(to right, #f5f5f5 80%, #f1790e 80%, #f1790e 95%, #19b7df 95%)",
    },
    {
      label: "Weapon Power",
      suffix: "%",
      value: items.reduce(() => 0, 20),
      max: 100,
      icon: "https://picsum.photos/seed/b/40",
    },
    {
      label: "Ability Power",
      suffix: "%",
      value: items.reduce(() => 0, 15),
      max: 100,
      icon: "https://picsum.photos/seed/c/40",
    },
    {
      label: "Weapon Speed",
      suffix: "%",
      value: items.reduce(() => 0, 40),
      max: 100,
      icon: "https://picsum.photos/seed/d/40",
    },
    {
      label: "Ability Cooldown",
      suffix: "%",
      value: items.reduce(() => 0, 10),
      max: 100,
      icon: "https://picsum.photos/seed/e/40",
    },
    {
      label: "Some other stat",
      suffix: "%",
      value: items.reduce(() => 0, 20),
      max: 100,
      icon: "https://picsum.photos/seed/f/40",
    },
    {
      label: "Some final stat",
      suffix: "%",
      value: items.reduce(() => 0, 80),
      max: 100,
      icon: "https://picsum.photos/seed/g/40",
    },
  ]);

  const shownStatistics = $derived(statistics.slice(0, expanded ? statistics.length : 5));
</script>

<div class="statistics">
  {#each shownStatistics as statistic (statistic.label)}
    <div transition:slide={{ duration: 50 }}>
      <ItemStastisticsBar {...statistic} />
    </div>
  {/each}
</div>

<button class="expand" onclick={() => (expanded = !expanded)}>
  {expanded ? "Show fewer stats" : "Show more stats"}
</button>

<style lang="scss">
  .statistics {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .expand {
    appearance: none;
    border: 0;
    padding: 0;
    margin: 0.5rem auto 0;
    background: transparent;
    color: $secondary;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      color: $white;
    }
  }
</style>
