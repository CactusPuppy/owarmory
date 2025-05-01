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

export const FullItemInclude = {
  statMods: {
    include: {
      stat: true,
    },
    orderBy: {
      orderIndex: "asc",
    },
  },
} as const satisfies Prisma.ItemInclude;

export const FullRoundInfoSectionInclude = {
  purchasedItems: {
    include: FullItemInclude,
  },
  soldItems: {
    include: FullItemInclude,
  },
  power: true,
} as const satisfies Prisma.RoundInfoSectionInclude;

export const FullRoundInfoInclude = {
  sections: {
    include: FullRoundInfoSectionInclude,
    orderBy: {
      orderIndex: "asc",
    },
  },
} as const satisfies Prisma.RoundInfoInclude;

export const FullStadiumBuildInclude = {
  author: true,
  hero: true,
  roundInfos: {
    include: FullRoundInfoInclude,
    orderBy: {
      orderIndex: "asc",
    },
  },
} as const satisfies Prisma.StadiumBuildInclude;

export type FullStadiumBuild = Prisma.StadiumBuildGetPayload<{
  include: typeof FullStadiumBuildInclude;
}>;
