import { prisma } from "$src/database/prismaClient.server.js";
import { BUILDS_PAGE_SIZE } from "$src/lib/types/page.js";
import { headers } from "$src/lib/constants/api";
import { FullStadiumBuildInclude } from "$src/lib/types/build.js";

export async function GET({ url, params }) {
  const { heroName } = params;

  const page = Number.parseInt(url.searchParams.get("page") ?? "0") || 0;
  const PAGE_SIZE =
    Number.parseInt(url.searchParams.get("page_size") ?? "", BUILDS_PAGE_SIZE) || BUILDS_PAGE_SIZE;

  const builds = await prisma.stadiumBuild.findMany({
    where: {
      heroName,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: FullStadiumBuildInclude,
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return new Response(JSON.stringify(builds), { headers });
}
