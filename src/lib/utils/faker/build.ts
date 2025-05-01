import { faker } from "@faker-js/faker";

import type { Hero, Item, Power, Prisma, User } from "$src/generated/prisma";
import { ROUND_MAX } from "$src/lib/constants/round";

export type AvailableTalents = {
  items: Item[];
  powers: Power[];
};

type SelectedTalentsForBuild = {
  boughtItems: Item[];
  soldItems: Item[];
  boughtPower?: Power;
}[][];

export const GeneratePurchaseSelections = (
  availableTalents: AvailableTalents,
): SelectedTalentsForBuild => {
  const SelectedTalents: SelectedTalentsForBuild = [];
  let accumulatedItems: Item[] = [];
  const accumulatedPowers: Power[] = [];
  // Preset the round section buys and sells to avoid headaches
  for (let round = 0; round < ROUND_MAX; round++) {
    const isPowerRound = round % 2 == 0;
    SelectedTalents[round] = [];
    const sectionCount = faker.number.int({ min: 1, max: 4 });

    for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {
      let soldItems = faker.helpers.arrayElements(availableTalents.items, { min: 0, max: 2 });
      let boughtItems = faker.helpers.arrayElements(availableTalents.items, { min: 1, max: 4 });
      let boughtPower = faker.helpers.arrayElement(availableTalents.powers);
      if (sectionIndex == 0) {
        // Ensure standard build follows a logical progression
        soldItems = faker.helpers.arrayElements(accumulatedItems, { min: 0, max: 2 });
        boughtItems = faker.helpers.arrayElements(
          availableTalents.items.filter(
            (stockItem) =>
              !accumulatedItems.map((item) => item.id).includes(stockItem.id) &&
              !soldItems.map((item) => item.id).includes(stockItem.id),
          ),
          { min: 0, max: 6 - accumulatedItems.length },
        );
        boughtPower = faker.helpers.arrayElement(
          availableTalents.powers.filter(
            (power) => !accumulatedPowers.map((accPow) => accPow.id).includes(power.id),
          ),
        );
        accumulatedItems = accumulatedItems.filter(
          (item) => !soldItems.map((si) => si.id).includes(item.id),
        );
        accumulatedItems.push(...boughtItems);
        if (isPowerRound) accumulatedPowers.push(boughtPower);
      }

      SelectedTalents[round][sectionIndex] = {
        boughtItems,
        soldItems,
        boughtPower: isPowerRound ? boughtPower : undefined,
      };
    }
  }

  return SelectedTalents;
};

export function createRandomBuild(
  author: User,
  hero: Hero,
  allTalents: AvailableTalents,
  overwrites: Partial<Omit<Prisma.StadiumBuildCreateInput, "author" | "hero">> = {},
): Prisma.StadiumBuildCreateInput {
  const {
    buildTitle = faker.word.words({ count: { min: 3, max: 9 } }),
    description = faker.word.words({ count: { min: 7, max: 25 } }),
    additionalNotes = faker.word.words({ count: { min: 10, max: 50 } }),
  } = overwrites;

  const heroTalents: AvailableTalents = {
    items: allTalents.items.filter((item) => !item.heroName || item.heroName === hero.name),
    powers: allTalents.powers.filter((power) => !power.heroName || power.heroName === hero.name),
  };

  const selections = GeneratePurchaseSelections(heroTalents);

  return {
    buildTitle,
    description,
    hero: {
      connect: { name: hero.name },
    },
    author: {
      connect: { id: author.id },
    },
    roundInfos: {
      create: Array(ROUND_MAX)
        .fill(0)
        .map((_, roundIndex) => createRandomRoundInfo(selections, roundIndex)),
    },
    additionalNotes,
  };
}

export function createRandomRoundInfo(
  selections: SelectedTalentsForBuild,
  roundIndex: number = 0,
  overwrites: Partial<Prisma.RoundInfoCreateWithoutParentBuildInput> = {},
): Prisma.RoundInfoCreateWithoutParentBuildInput {
  const { note = faker.word.words({ count: { min: 7, max: 25 } }) } = overwrites;
  const roundSelections = selections[roundIndex];

  return {
    note,
    orderIndex: roundIndex,
    sections: {
      create: Array(roundSelections.length)
        .fill(0)
        .map((_, sectionIndex) => createRandomRoundInfoSection(roundSelections, sectionIndex)),
    },
  };
}

export function createRandomRoundInfoSection(
  roundSelections: SelectedTalentsForBuild[number],
  sectionIndex: number,
  overwrites: Partial<Prisma.RoundInfoSectionCreateWithoutParentRoundInfoInput> = {},
): Prisma.RoundInfoSectionCreateWithoutParentRoundInfoInput {
  const { title = faker.word.words({ count: { min: 2, max: 7 } }) } = overwrites;

  return {
    title: sectionIndex == 0 ? "" : title,
    orderIndex: sectionIndex,
    power: roundSelections[sectionIndex].boughtPower
      ? {
          connect: { id: roundSelections[sectionIndex].boughtPower.id },
        }
      : undefined,
    purchasedItems: {
      connect: roundSelections[sectionIndex].boughtItems.map((item) => ({ id: item.id })),
    },
    soldItems: {
      connect: roundSelections[sectionIndex].soldItems.map((item) => ({ id: item.id })),
    },
  };
}
