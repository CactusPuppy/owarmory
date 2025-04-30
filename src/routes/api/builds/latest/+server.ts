import { prisma } from "$src/database/prismaClient.server.js";
import { FullStadiumBuildInclude } from "$src/lib/types/build";

export async function GET({ url }) {
  const headers = { "Content-Type": "application/json" };
  const page = Number.parseInt(url.searchParams.get("page") ?? "0") || 0;
  const PAGE_SIZE = Number.parseInt(url.searchParams.get("page_size") ?? "", 10) || 10;

  const builds = await prisma.stadiumBuild.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: FullStadiumBuildInclude,
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return new Response(JSON.stringify(builds), { headers });
}
