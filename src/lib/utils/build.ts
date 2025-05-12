import type {
  BuildData,
  FlatFullRoundInfoSection,
  StatTotal,
  FullItem,
  FullStadiumBuild,
} from "$lib/types/build";
import type { FullRoundSectionInfo } from "../types/round";
import type { Hero, Power } from "$src/generated/prisma";
import type { z } from "zod";
import { camelCaseToTitleCase } from "./string";

type BuildRoundSectionData = FullRoundSectionInfo | FlatFullRoundInfoSection;

export function getBuildPowersForRound(build: BuildData, round = 7): Power[] {
  const powers: Power[] = [];

  getBuildStandardSectionsForRound(build, round).forEach(({ power }) => {
    if (power) powers.push(power);
  });

  return powers;
}

export function getBuildItemsForRound(build: BuildData, round = 7): FullItem[] {
  const items = getBuildStandardSectionsForRound(build, round).reduce((acc, section) => {
    acc = acc.filter((item) => section.soldItems.every((i) => i.id !== item.id));
    acc.push(...section.purchasedItems);
    return acc;
  }, [] as FullItem[]);

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

  build.roundInfos.slice(0, round).forEach((roundInfo) => {
    sections.push(...roundInfo.sections.filter((section) => !section.title));
  });

  return sections;
}

export function getAllBuildItems(build: BuildData): FullItem[] {
  return build.roundInfos.flatMap((roundInfo) => {
    return roundInfo.sections
      .filter((section) => !section.title)
      .flatMap((section) => [...section.soldItems, ...section.purchasedItems]);
  });
}

export function isItemPreviouslyOwned(items: FullItem[], item: FullItem) {
  const numberOfTimesInteractedWithItem = items.filter((i) => i.id === item.id)?.length || 0;

  if (!numberOfTimesInteractedWithItem) return false;

  return numberOfTimesInteractedWithItem % 2 !== 0;
}

export function getAllItemStatModifiers(items: FullItem[], hero: Hero): Record<string, StatTotal> {
  let { baseHealth: health } = hero;
  const statTotals: Record<string, StatTotal> = {};

  const LifeRelatedStats = ["Health", "Armor", "Shields"];

  for (const item of items) {
    let overcharge = 0;
    for (const statMod of item.statMods) {
      const { isPercentage } = statMod;
      const { id, name } = statMod.stat;
      let amount = statMod.amount;
      // Assumes that the only negative modifiers are for Life
      if (statMod.stat.name == "Health" && amount < 0 && Math.abs(amount) > health - 1) {
        overcharge = Math.abs(statMod.amount) - (health - 1);
        amount += overcharge; // Not a mistake, amount is negative
        health += amount;
      } else if (LifeRelatedStats.includes(statMod.stat.name) && overcharge > 0) {
        const madeBack = Math.min(overcharge, statMod.amount);
        overcharge -= madeBack;
        amount -= madeBack;
      }

      if (!(name in statTotals)) {
        statTotals[name] = { id, isPercentage, totalAmount: 0 };
      }

      const summary = statTotals[name];
      summary.totalAmount += amount;
    }
  }

  return statTotals;
}

export const BuildErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const humanReadablePath = ZodIssuePathInBuildToHumanString(issue.path);

  return { message: `${humanReadablePath}: ${ctx.defaultError}` };
};

export function ZodIssuePathInBuildToHumanString(path: z.ZodIssue["path"]): string {
  const result: string[] = [];

  if (path.length < 1) return "";

  for (const pathSection of path) {
    if (typeof pathSection == "string") {
      if (pathSection == "roundInfos") {
        result.push("Rounds");
      } else {
        result.push(camelCaseToTitleCase(pathSection));
      }
    } else {
      const label = result[result.length - 1];
      // HACK: this assumes that the last letter of the label is "s" for plurality
      result[result.length - 1] =
        `${label.slice(0, label.length - 1)} ${(pathSection + 1).toString(10)}`;
    }
  }

  return result.join(": ");
}

export function filterUniqueBuilds(builds: FullStadiumBuild[]): FullStadiumBuild[] {
  const uniqueIds: Set<string> = new Set();
  const filteredBuilds = [];

  for (let i = 0; i < builds.length; i++) {
    const build = builds[i];
    if (uniqueIds.has(build.id)) continue;

    uniqueIds.add(build.id);
    filteredBuilds.push(build);
  }

  return filteredBuilds;
}
