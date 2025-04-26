import type { Build, RoundInfo, RoundInfoSection } from "$lib/types/build";

// TODO: Replace unknown type with Power[] type
export function getBuildFinalPowers(build: Build): unknown[] {
  const powers: unknown[] = [];

  getBuildStandardSections(build).forEach(({ power }) => {
    if (power) powers.push(power);
  });

  return powers;
}

// TODO: Replace unknown type with Power[] type
export function getBuildFinalItems(build: Build): unknown[] {
  const items: unknown[] = [];

  getBuildStandardSections(build).forEach((section) => {
    items.push(...section.items);
  });

  return items;
}

export function getBuildFinalCost(build: Build): number {
  return getBuildFinalItems(build).reduce((sum, item) => sum + item.cost, 0);
}

/** @returns All standard section of a build, excluding all "alternative" options */
export function getBuildStandardSections(build: Build): RoundInfoSection[] {
  const sections: RoundInfoSection[] = [];

  build.roundInfos.forEach((roundInfo: RoundInfo) => {
    sections.push(...roundInfo.sections.filter((section) => !section.title));
  });

  return sections;
}
