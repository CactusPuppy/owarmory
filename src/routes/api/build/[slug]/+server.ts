import { prisma } from "$src/database/prismaClient.server";
import { FullStadiumBuildInclude } from "$src/lib/types/build";
import { error } from "@sveltejs/kit";
import { headers } from "$src/lib/constants/api";

export async function GET({ params }) {
  const build = await prisma.stadiumBuild.findFirst({
    where: {
      id: params.slug,
    },
    include: FullStadiumBuildInclude,
  });

  if (!build) error(404, "Build not found");

  return new Response(JSON.stringify(build), { headers });
}
