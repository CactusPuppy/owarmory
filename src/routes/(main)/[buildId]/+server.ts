import { prisma } from "$src/database/prismaClient.server";
import { buildPath } from "$src/lib/utils/routes";
import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const { buildId } = params;

  const build = await prisma.stadiumBuild.findFirst({ where: { id: buildId } });
  if (!build) error(404, "Build not found");

  redirect(308, buildPath(build));
};
