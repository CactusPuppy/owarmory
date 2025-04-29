import type { FullStadiumBuild } from "$lib/types/build";
import type { FullRoundInfo, FullRoundSectionInfo } from "../types/round";
import type { Item } from "$src/generated/prisma";
import type { Power } from "$src/generated/prisma";

export function getBuildPowersForRound(build: FullStadiumBuild, round = 7): Power[] {
  const powers: Power[] = [];

  getBuildStandardSectionsForRound(build, round).forEach(({ power }) => {
    if (power) powers.push(power);
  });

  return powers;
}

export function getBuildItemsForRound(build: FullStadiumBuild, round = 7): Item[] {
  const items: Item[] = [];

  getBuildStandardSectionsForRound(build, round).forEach((section) => {
    items.push(...section.items);
  });

  return items;
}

export function getBuildCostForRound(build: FullStadiumBuild, round = 7): number {
  return getBuildItemsForRound(build, round).reduce((sum, item) => sum + item.cost, 0);
}

/** @returns All standard section of a build up to a certain round, excluding all "alternative" options */
export function getBuildStandardSectionsForRound(
  build: FullStadiumBuild,
  round = 7,
): FullRoundSectionInfo[] {
  const sections: FullRoundSectionInfo[] = [];

  build.roundInfos.slice(0, round).forEach((roundInfo: FullRoundInfo) => {
    sections.push(...roundInfo.sections.filter((section) => !section.title));
  });

  return sections;
}
