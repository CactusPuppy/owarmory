<script lang="ts">
  import { slide } from "svelte/transition";
  import ItemStastisticsBar from "./ItemStastisticsBar.svelte";

  // Hero will be used at some point for the health value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, hero } = $props();

  let expanded = $state(false);

  const statistics = $derived([
    {
      label: "Life",
      suffix: "",
      value: 300,
      max: 300,
      icon: "/images/stats/Life.webp",
      background: "linear-gradient(to right, #f5f5f5 80%, #f1790e 80%, #f1790e 95%, #19b7df 95%)",
    },
    {
      label: "Weapon Power",
      suffix: "%",
      value: items.reduce(() => 0, 20),
      max: 100,
      icon: "/images/stats/Weapon Power.webp",
    },
    {
      label: "Ability Power",
      suffix: "%",
      value: items.reduce(() => 0, 15),
      max: 100,
      icon: "/images/stats/Ability Power.webp",
    },
    {
      label: "Attack Speed",
      suffix: "%",
      value: items.reduce(() => 0, 40),
      max: 100,
      icon: "/images/stats/Attack Speed.webp",
    },
    {
      label: "Cooldown Reduction",
      suffix: "%",
      value: items.reduce(() => 0, 10),
      max: 100,
      icon: "/images/stats/Cooldown Reduction.webp",
    },
    {
      label: "Max Ammo",
      suffix: "%",
      value: items.reduce(() => 0, 20),
      max: 100,
      icon: "/images/stats/Max Ammo.webp",
    },
    {
      label: "Weapon Lifesteal",
      suffix: "%",
      value: items.reduce(() => 0, 0),
      max: 100,
      icon: "/images/stats/Weapon Lifesteal.webp",
    },
    {
      label: "Ability Lifesteal",
      suffix: "%",
      value: items.reduce(() => 0, 20),
      max: 100,
      icon: "/images/stats/Ability Lifesteal.webp",
    },
    {
      label: "Move Speed",
      suffix: "%",
      value: items.reduce(() => 0, 30),
      max: 100,
      icon: "/images/stats/Move Speed.webp",
    },
    {
      label: "Reload Speed",
      suffix: "%",
      value: items.reduce(() => 0, 5),
      max: 100,
      icon: "/images/stats/Reload Speed.webp",
    },
    {
      label: "Melee Damage",
      suffix: "%",
      value: items.reduce(() => 0, 10),
      max: 100,
      icon: "/images/stats/Weapon Lifesteal.webp",
    },
    {
      label: "Critical Damage",
      suffix: "%",
      value: items.reduce(() => 0, 15),
      max: 100,
      icon: "/images/stats/Critical Damage.webp",
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
