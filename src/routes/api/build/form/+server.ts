import { prisma } from "$src/database/prismaClient.server.js";
import type { User } from "$src/generated/prisma/client.js";

const headers = { "Content-Type": "application/json" };

export async function POST() {
  return new Response(JSON.stringify({ message: "Build creation is disabled" }));
}

export async function PATCH() {
  return new Response(JSON.stringify({ message: "Build editing is disabled" }));
}

export async function DELETE({ locals, request }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;

  if (!currentUser)
    return new Response(JSON.stringify({ message: "Must be logged in to edit this build!" }), {
      headers,
      status: 401,
    });

  const response = await request.json();
  const buildId = response.id;

  if (!isUserAuthorOfBuild(currentUser.id, buildId))
    return new Response(JSON.stringify({ message: "You are not authorized to edit this build" }), {
      headers,
      status: 403,
    });

  try {
    await prisma.$transaction(async (tx) => {
      const roundInfos = await tx.roundInfo.findMany({
        where: { buildId },
        select: { id: true },
      });

      const roundInfoIds = roundInfos.map((r) => r.id);

      const sections = await tx.roundInfoSection.findMany({
        where: {
          parentRoundInfoId: { in: roundInfoIds },
        },
        select: { id: true },
      });

      const sectionIds = sections.map((s) => s.id);

      await tx.roundInfoSection.deleteMany({
        where: { id: { in: sectionIds } },
      });

      await tx.roundInfo.deleteMany({
        where: { id: { in: roundInfoIds } },
      });

      await tx.stadiumBuild.delete({ where: { id: buildId } });
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ message: String(error) }), { headers, status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { headers });
}

async function isUserAuthorOfBuild(userId: string, buildId: string): Promise<boolean> {
  const serverFetchedBuild = await prisma.stadiumBuild.findFirstOrThrow({
    where: { id: buildId },
  });

  return userId == serverFetchedBuild.id;
}
