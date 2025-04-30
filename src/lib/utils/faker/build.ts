import { faker } from "@faker-js/faker";

import type { Hero, Item, Power, Prisma, User } from "$src/generated/prisma";
import { ROUND_MAX } from "$src/lib/constants/round";

export type AvailableTalents = {
  items: Item[];
  powers: Power[];
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
        .map((_, roundIndex) => createRandomRoundInfo(heroTalents, roundIndex)),
    },
    additionalNotes,
  };
}

export function createRandomRoundInfo(
  allTalents: AvailableTalents,
  roundIndex: number = 0,
  overwrites: Partial<Prisma.RoundInfoCreateWithoutParentBuildInput> = {},
): Prisma.RoundInfoCreateWithoutParentBuildInput {
  const { note = faker.word.words({ count: { min: 7, max: 25 } }) } = overwrites;

  return {
    note,
    sections: {
      create: Array(faker.number.int({ min: 1, max: 4 }))
        .fill(0)
        .map((_, i) =>
          createRandomRoundInfoSection(
            allTalents,
            {
              includePower: roundIndex % 2 == 0,
            },
            {
              title: i > 0 ? undefined : "",
            },
          ),
        ),
    },
  };
}

export function createRandomRoundInfoSection(
  allTalents: AvailableTalents,
  options: {
    includePower?: boolean;
  } = {},
  overwrites: Partial<Prisma.RoundInfoSectionCreateWithoutParentRoundInfoInput> = {},
): Prisma.RoundInfoSectionCreateWithoutParentRoundInfoInput {
  const { title = faker.word.words({ count: { min: 2, max: 7 } }) } = overwrites;

  return {
    title,
    power: options.includePower
      ? {
          connect: { id: faker.helpers.arrayElement(allTalents.powers)!.id },
        }
      : undefined,
    items: {
      connect: faker.helpers
        .arrayElements(allTalents.items, { min: 0, max: 4 })
        .map((item) => ({ id: item.id })),
    },
  };
}
