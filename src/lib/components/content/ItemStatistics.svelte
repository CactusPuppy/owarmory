<script lang="ts">
  import { slide } from "svelte/transition";
  import ItemStastisticsBar from "./ItemStastisticsBar.svelte";
  import type { ComponentProps } from "svelte";
  import { getAllItemStatModifiers } from "$src/lib/utils/build";
  import type { FullItem, StatTotal } from "$src/lib/types/build";
  import type { Hero, Stat } from "$src/generated/prisma";
  import Healthbar from "./Healthbar.svelte";

  const { items, hero, stats }: { items: FullItem[]; hero: Hero; stats: Stat[] } = $props();

  function findStatByName(statName: string) {
    return stats.find((stat) => stat.name == statName);
  }

  const lifeStat = $derived(findStatByName("Life"));

  let expanded = $state(false);

  const statTotals: Record<string, StatTotal> = $derived(
    getAllItemStatModifiers(items, hero) || [],
  );

  const { health, armor, shields } = $derived({
    health: hero.baseHealth + (statTotals["Life"]?.totalAmount ?? 0),
    armor: hero.baseArmor + (statTotals["Armor"]?.totalAmount ?? 0),
    shields: hero.baseShields + (statTotals["Shields"]?.totalAmount ?? 0),
  });

  const statsOrder = [
    "Weapon Power",
    "Ability Power",
    "Attack Speed",
    "Cooldown Reduction",
    "Max Ammo",
    "Weapon Lifesteal",
    "Ability Lifesteal",
    "Move Speed",
    "Reload Speed",
    "Melee Damage",
    "Critical Damage",
  ];

  const statistics: ComponentProps<typeof ItemStastisticsBar>[] = $derived(
    statsOrder.map((stat) => getSimplePercentageStatistic(findStatByName(stat)!)),
  );

  const shownStatistics = $derived(statistics.slice(0, expanded ? statistics.length : 4));

  function getSimplePercentageStatistic(stat: Stat): ComponentProps<typeof ItemStastisticsBar> {
    const value = statTotals[stat.name]?.totalAmount || 0;

    return {
      label: stat.name,
      description: stat.description ?? undefined,
      suffix: "%",
      value,
      max: 100,
      icon: `/images/stats/${stat.name}.webp`,
    };
  }
</script>

<div class="statistics">
  <div transition:slide={{ duration: 50 }}>
    <Healthbar
      label="Life"
      description={lifeStat?.description ?? ""}
      icon={lifeStat?.iconURL ?? ""}
      {health}
      {armor}
      {shields}
    />
  </div>

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
