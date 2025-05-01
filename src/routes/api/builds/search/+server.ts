import { prisma } from "$src/database/prismaClient.server.js";
import { FullStadiumBuildInclude } from "$src/lib/types/build";

export async function GET({ url }) {
  const headers = { "Content-Type": "application/json" };

  const query = url.searchParams.get("query") || "";

  // Require all words to be present in results
  const search = query.split(/\s+/g).join(" & ");

  const PAGE_SIZE = 20;

  const builds = await prisma.stadiumBuild.findMany({
    where: {
      buildTitle: {
        search,
      },
      heroName: {
        search,
      },
    },
    orderBy: {
      _relevance: {
        fields: ["buildTitle", "heroName"],
        search,
        sort: "desc",
      },
    },
    include: FullStadiumBuildInclude,
    take: PAGE_SIZE,
  });

  return new Response(JSON.stringify(builds), { headers });
}
