import { prisma } from "$src/database/prismaClient.server.js";
import { BUILDS_PAGE_SIZE } from "$lib/constants/page";
import { headers } from "$src/lib/constants/api";

export async function GET({ url, params }) {
  const { id } = params;

  const page = Number.parseInt(url.searchParams.get("page") ?? "0") || 0;
  const PAGE_SIZE =
    Number.parseInt(url.searchParams.get("page_size") ?? "", BUILDS_PAGE_SIZE) || BUILDS_PAGE_SIZE;

  const builds = await prisma.stadiumBuild.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return new Response(JSON.stringify(builds), { headers });
}
