import type { BuildData, FlatFullRoundInfoSection } from "$lib/types/build";
import type { FullRoundSectionInfo } from "../types/round";
import type { Item } from "$src/generated/prisma";
import type { Power } from "$src/generated/prisma";

type BuildRoundSectionData = FullRoundSectionInfo | FlatFullRoundInfoSection;

export function getBuildPowersForRound(build: BuildData, round = 7): Power[] {
  const powers: Power[] = [];

  getBuildStandardSectionsForRound(build, round).forEach(({ power }) => {
    if (power) powers.push(power);
  });

  return powers;
}

export function getBuildItemsForRound(build: BuildData, round = 7): Item[] {
  const items = getBuildStandardSectionsForRound(build, round).reduce((acc, section) => {
    acc = acc.filter((item) => section.soldItems.every((i) => i.id !== item.id));
    acc.push(...section.purchasedItems);
    return acc;
  }, [] as Item[]);

  return items;
}

export function getBuildCostForRound(build: BuildData, round = 7): number {
  return getBuildItemsForRound(build, round).reduce((sum, item) => sum + item.cost, 0);
}

/** @returns All standard section of a build up to a certain round, excluding all "alternative" options */
export function getBuildStandardSectionsForRound(
  build: BuildData,
  round = 7,
): BuildRoundSectionData[] {
  const sections: BuildRoundSectionData[] = [];

  build.roundInfos?.slice(0, round).forEach((roundInfo) => {
    sections.push(...roundInfo.sections.filter((section) => !section.title));
  });

  return sections;
}

export function getAllBuildItems(build: BuildData): Item[] {
  return build.roundInfos.flatMap((roundInfo) => {
    return roundInfo.sections
      .filter((section) => !section.title)
      .flatMap((section) => [...section.soldItems, ...section.purchasedItems]);
  });
}

export function isItemPreviouslyOwned(items: Item[], item: Item) {
  const numberOfTimesInteractedWithItem = items.filter((i) => i.id === item.id)?.length || 0;

  if (!numberOfTimesInteractedWithItem) return false;

  return numberOfTimesInteractedWithItem % 2 !== 0;
}
