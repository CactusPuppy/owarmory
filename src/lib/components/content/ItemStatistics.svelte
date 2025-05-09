<script lang="ts">
  import { slide } from "svelte/transition";
  import ItemStastisticsBar from "./ItemStastisticsBar.svelte";
  import type { ComponentProps } from "svelte";
  import { getAllItemStatModifiers } from "$src/lib/utils/build";
  import type { StatTotal } from "$src/lib/types/build";

  // Hero will be used at some point for the health value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, hero } = $props();

  let expanded = $state(false);

  const statTotals: Record<string, StatTotal> = $derived(getAllItemStatModifiers(items) || []);

  const statistics: ComponentProps<typeof ItemStastisticsBar>[] = $derived([
    {
      label: "Life",
      suffix: "",
      value: 300,
      max: 300,
      icon: "/images/stats/Life.webp",
      background: "linear-gradient(to right, #f5f5f5 80%, #f1790e 80%, #f1790e 95%, #19b7df 95%)",
    },
    getSimplePercentageStatistic("Weapon Power"),
    getSimplePercentageStatistic("Ability Power"),
    getSimplePercentageStatistic("Attack Speed"),
    getSimplePercentageStatistic("Cooldown Reduction"),
    getSimplePercentageStatistic("Max Ammo"),
    getSimplePercentageStatistic("Weapon Lifesteal"),
    getSimplePercentageStatistic("Ability Lifesteal"),
    getSimplePercentageStatistic("Move Speed"),
    getSimplePercentageStatistic("Reload Speed"),
    getSimplePercentageStatistic("Melee Damage"),
    getSimplePercentageStatistic("Critical Damage"),
  ]);

  const shownStatistics = $derived(statistics.slice(0, expanded ? statistics.length : 5));

  function getSimplePercentageStatistic(name: string): ComponentProps<typeof ItemStastisticsBar> {
    const value = statTotals[name]?.totalAmount || 0;

    return {
      label: name,
      suffix: "%",
      value,
      max: 100,
      icon: `/images/stats/${name}.webp`,
    };
  }
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
