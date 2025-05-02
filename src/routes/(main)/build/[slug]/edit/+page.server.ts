import { prisma } from "$src/database/prismaClient.server";
import { isHeroName } from "$src/lib/types/hero.js";
import { getAllAvailableTalentsForHero } from "$src/lib/utils/talents.server.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const build = await prisma.stadiumBuild.findFirstOrThrow({
    where: {
      id: params.slug,
    },
  });

  if (!isHeroName(build.heroName)) error(500, "Unknown hero name from build " + build.id);
  const availableTalents = await getAllAvailableTalentsForHero(build.heroName);

  return {
    availableTalents,
  };
}
