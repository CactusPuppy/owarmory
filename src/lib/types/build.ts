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

export const FullStadiumBuildInclude = {
  author: true,
  hero: true,
  roundInfos: {
    include: {
      sections: {
        include: {
          items: true,
          power: true,
        },
      },
    },
  },
} as const;
export type FullStadiumBuild = Prisma.StadiumBuildGetPayload<{
  include: typeof FullStadiumBuildInclude;
}>;
