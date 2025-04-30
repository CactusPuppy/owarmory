import { prisma } from "$src/database/prismaClient.server.js";
import { error } from "@sveltejs/kit";

export async function GET({ url }) {
  const targetUserId = url.searchParams.get("userId");
  if (!targetUserId) {
    error(400, "Must specify a user to get builds from");
  }

  const headers = { "Content-Type": "application/json" };
  const page = Number.parseInt(url.searchParams.get("page") ?? "0") || 0;
  const PAGE_SIZE = Number.parseInt(url.searchParams.get("page_size") ?? "", 10) || 10;

  const builds = prisma.stadiumBuild.findMany({
    where: {
      authorId: targetUserId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return new Response(JSON.stringify(builds), { headers });
}
