import { prisma } from "$src/database/prismaClient.server.js";
import { FullStadiumBuildInclude } from "$src/lib/types/build";
import { BUILDS_PAGE_SIZE } from "$src/lib/constants/page.js";
import { headers } from "$src/lib/constants/api";

export async function GET({ url, params }) {
  const page = Number.parseInt(url.searchParams.get("page") ?? "0", BUILDS_PAGE_SIZE) || 0;
  const MAX_PAGE_SIZE = 100;
  let PAGE_SIZE =
    Number.parseInt(url.searchParams.get("page_size") ?? "", BUILDS_PAGE_SIZE) || BUILDS_PAGE_SIZE;
  if (PAGE_SIZE > MAX_PAGE_SIZE) PAGE_SIZE = MAX_PAGE_SIZE;

  const builds = await prisma.stadiumBuild.findMany({
    where: {
      tags: {
        some: {
          id: Number(params.id),
        },
      },
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
