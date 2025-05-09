import { prisma } from "$src/database/prismaClient.server";
import { headers } from "$src/lib/constants/api";

/**
 * @returns Return either an item or a power
 */
export async function GET({ params }) {
  const item = await prisma.item.findFirst({
    include: {
      statMods: {
        include: {
          stat: true,
        },
      },
    },
    where: {
      name: params.phrase,
    },
  });

  if (item) return new Response(JSON.stringify(item), { headers });

  const power = await prisma.power.findFirst({
    where: {
      name: params.phrase,
    },
  });

  return new Response(JSON.stringify(power), { headers });
}
