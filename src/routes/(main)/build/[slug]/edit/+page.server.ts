import { prisma } from "$src/database/prismaClient.server";
import type { Item, Power } from "$src/generated/prisma/index.js";
import { isHeroName } from "$src/lib/types/hero.js";
import { api } from "$src/lib/utils/api.js";
import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const build = await prisma.stadiumBuild.findFirstOrThrow({
    where: {
      id: params.slug,
    },
  });

  if (!isHeroName(build.heroName)) error(500, "Unknown hero name from build " + build.id);
  const [items, powers] = await Promise.all([
    api<Item[]>("talents/items", { hero: build.heroName }, fetch),
    api<Power[]>("talents/powers", { hero: build.heroName }, fetch),
  ]);

  return {
    availableTalents: {
      items,
      powers,
    },
  };
}
