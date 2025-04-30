import type { Prisma } from "$src/generated/prisma";

export const ItemRarity = {
  Common: "Common",
  Rare: "Rare",
  Epic: "Epic",
} as const;
export type ItemRarity = (typeof ItemRarity)[keyof typeof ItemRarity];

export const ItemCategory = {
  Weapon: "Weapon",
  Ability: "Ability",
  Survival: "Survival",
} as const;
export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory];

export const FullRoundInfoSectionInclude: Prisma.RoundInfoSectionInclude = {
  items: {
    include: {
      statMods: {
        include: {
          stat: true,
        },
        orderBy: {
          orderIndex: "asc",
        },
      },
    },
  },
  power: true,
} as const;

export const FullRoundInfoInclude: Prisma.RoundInfoInclude = {
  sections: {
    include: FullRoundInfoSectionInclude,
    orderBy: {
      orderIndex: "asc",
    },
  },
} as const;

export const FullStadiumBuildInclude: Prisma.StadiumBuildInclude = {
  author: true,
  hero: true,
  roundInfos: {
    include: FullRoundInfoInclude,
    orderBy: {
      orderIndex: "asc",
    },
  },
} as const;
export type FullStadiumBuild = Prisma.StadiumBuildGetPayload<{
  include: typeof FullStadiumBuildInclude;
}>;
