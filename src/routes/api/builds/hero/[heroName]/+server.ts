import { prisma } from "$src/database/prismaClient.server.js";
import { BUILDS_PAGE_SIZE } from "$src/lib/types/page.js";

export async function GET({ url, params }) {
  const { heroName } = params;

  const headers = { "Content-Type": "application/json" };
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
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return new Response(JSON.stringify(builds), { headers });
}
