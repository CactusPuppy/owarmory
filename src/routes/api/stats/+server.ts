import { prisma } from "$src/database/prismaClient.server";

export async function GET({ url }) {
  const headers = { "Content-Type": "application/json" };
  const includeOnlyMajorStats = !!url.searchParams.get("major");

  const stats = await prisma.stat.findMany({
    where: includeOnlyMajorStats
      ? {
          description: {
            not: null,
          },
        }
      : undefined,
  });

  return new Response(JSON.stringify(stats), { headers });
}
