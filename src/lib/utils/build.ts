import type { Build, RoundInfo, RoundInfoSection } from "$lib/types/build";

// TODO: Replace unknown type with Power[] type
export function getBuildPowersForRound(build: Build, round = 7): unknown[] {
  const powers: unknown[] = [];

  getBuildStandardSectionsForRound(build, round).forEach(({ power }) => {
    if (power) powers.push(power);
  });

  return powers;
}

// TODO: Replace unknown type with Item[] type
export function getBuildItemsForRound(build: Build, round = 7): unknown[] {
  const items: unknown[] = [];

  getBuildStandardSectionsForRound(build, round).forEach((section) => {
    items.push(...section.items);
  });

  return items;
}

export function getBuildCostForRound(build: Build, round = 7): number {
  return getBuildItemsForRound(build, round).reduce((sum, item) => sum + item.cost, 0);
}

/** @returns All standard section of a build up to a certain round, excluding all "alternative" options */
export function getBuildStandardSectionsForRound(build: Build, round = 7): RoundInfoSection[] {
  const sections: RoundInfoSection[] = [];

  build.roundInfos.slice(0, round).forEach((roundInfo: RoundInfo) => {
    sections.push(...roundInfo.sections.filter((section) => !section.title));
  });

  return sections;
}

// TODO: Replace unknown type with Item[] type
export function getAllBuildItems(build: Build): unknown[] {
  return build.roundInfos.flatMap(roundInfo => {
    return roundInfo.sections.filter(section => !section.title).flatMap(section => section.items);
  });
}
