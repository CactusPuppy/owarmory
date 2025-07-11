import { prisma } from "$src/database/prismaClient.server";
import { FullItemInclude } from "$src/lib/types/build.js";
import { isHeroName } from "$src/lib/types/hero";
import { error } from "@sveltejs/kit";

/**
 * @returns A list of all powers, optionally filtered for powers only available to `hero`
 */
export async function GET({ url }) {
  const headers = { "Content-Type": "application/json" };
  const heroName = url.searchParams.get("hero");

  if (heroName && !isHeroName(heroName))
    error(400, `Specified hero ${heroName} is not a valid hero name`);

  const powers = await prisma.item.findMany({
    include: FullItemInclude,
    where: {
      OR: heroName
        ? [
            {
              heroName: null,
            },
            {
              heroName,
            },
          ]
        : undefined,
    },
  });

  return new Response(JSON.stringify(powers), { headers });
}
