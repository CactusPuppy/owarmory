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

export type FullStadiumBuild = Prisma.StadiumBuildGetPayload<{
  include: {
    roundInfos: {
      include: {
        sections: {
          include: {
            power: true;
            items: true;
          };
        };
      };
    };
  };
}>;
