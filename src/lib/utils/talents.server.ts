import { prisma } from "$src/database/prismaClient.server";
import type { Item, Power } from "$src/generated/prisma";
import { FullItemInclude } from "../types/build";
import type { HeroName } from "../types/hero";
export type AvailableTalents = {
  items: Item[];
  powers: Power[];
};

export async function getAllAvailableTalentsForHero(hero: HeroName): Promise<AvailableTalents> {
  const [items, powers] = await Promise.all([
    prisma.item.findMany({
      where: {
        OR: [
          {
            heroName: null,
          },
          {
            heroName: hero,
          },
        ],
      },
      include: FullItemInclude,
    }),
    prisma.power.findMany({
      where: {
        heroName: hero,
      },
    }),
  ]);

  return {
    items,
    powers,
  };
}
