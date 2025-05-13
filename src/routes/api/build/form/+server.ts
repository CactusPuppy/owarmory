import { z, ZodError } from "zod";

import { BuildErrorMap } from "$src/lib/utils/build.js";
import {
  BuildDataSchema,
  ExistingBuildDataSchema,
  FullStadiumBuildInclude,
  type BuildData,
  type ValidatedBuildData,
  type ValidatedExistingBuildData,
} from "$src/lib/types/build.js";
import { prisma } from "$src/database/prismaClient.server.js";
import type { Prisma, StadiumBuild, User } from "$src/generated/prisma/client.js";

const headers = { "Content-Type": "application/json" };

export async function POST({ locals, request }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;

  if (!currentUser)
    return new Response(JSON.stringify({ message: "Must be logged in to create a build!" }), {
      headers,
      status: 401,
    });

  const build: BuildData = await request.json();
  let validatedBuild: ValidatedBuildData;

  try {
    validatedBuild = validateNewBuild(build);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ message: JSON.stringify(error) }), {
        headers: { ...headers, "X-Error-Type": "validation" },
        status: 400,
      });
    }
    // @ts-expect-error unknown type does not have message
    return new Response(JSON.stringify({ message: error.message }), { headers, status: 500 });
  }

  let newBuild: StadiumBuild;
  try {
    newBuild = await prisma.stadiumBuild.create({
      data: {
        ...validatedBuild,
        authorId: currentUser.id,
        tags: {
          connect: validatedBuild.tags.map((tag) => ({ id: tag.id })),
        },
        roundInfos: {
          create: validatedBuild.roundInfos.map(
            (roundInfo, i): Prisma.RoundInfoCreateWithoutParentBuildInput => ({
              note: roundInfo.note,
              orderIndex: i,
              sections: {
                create: roundInfo.sections.map(
                  (section, i): Prisma.RoundInfoSectionCreateWithoutParentRoundInfoInput => ({
                    orderIndex: i,
                    power: section.power
                      ? {
                          connect: {
                            id: section.power?.id,
                          },
                        }
                      : undefined,
                    purchasedItems: {
                      connect: section.purchasedItems.map((item) => ({ id: item.id })),
                    },
                    soldItems: {
                      connect: section.soldItems.map((item) => ({ id: item.id })),
                    },
                  }),
                ),
              },
            }),
          ),
        },
      },
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ message: String(error) }), { headers, status: 500 });
  }

  const response = {
    newBuild,
  };

  return new Response(JSON.stringify(response), { headers });
}

export async function PATCH({ locals, request }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;

  if (!currentUser)
    return new Response(JSON.stringify({ message: "Must be logged in to edit this build!" }), {
      headers,
      status: 401,
    });

  const build: BuildData = await request.json();
  let validatedBuild: ValidatedExistingBuildData;

  try {
    validatedBuild = validateExistingBuild(build);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ message: JSON.stringify(error) }), {
        headers: { ...headers, "X-Error-Type": "validation" },
        status: 400,
      });
    }
    // @ts-expect-error unknown type does not have message
    return new Response(JSON.stringify({ message: error.message }), { headers, status: 500 });
  }

  if (!isUserAuthorOfBuild(currentUser.id, validatedBuild.id))
    return new Response(JSON.stringify({ message: "You are not authorized to edit this build" }), {
      headers,
      status: 403,
    });

  const {
    roundInfos: _roundInfos,
    id: _id,
    tags: _tags,
    ...topLevelValidatedData
  } = validatedBuild;
  let updatedBuild: StadiumBuild;
  try {
    await prisma.$transaction(async (tx) => {
      // Update top-level details
      await tx.stadiumBuild.update({
        where: {
          id: validatedBuild.id,
        },
        data: {
          ...topLevelValidatedData,
          tags: {
            set: validatedBuild.tags.map((tag) => ({ id: tag.id })),
          },
        },
      });
      // Update rounds
      for (const [roundIndex, roundInfo] of validatedBuild.roundInfos.entries()) {
        // Update top-level data
        const { sections: _sections, ...topLevelRoundInfo } = roundInfo;
        const { id: roundInfoId } = await tx.roundInfo.findFirstOrThrow({
          where: {
            AND: [
              {
                parentBuild: { id: validatedBuild.id },
              },
              {
                orderIndex: roundIndex,
              },
            ],
          },
          select: {
            id: true,
          },
        });
        await tx.stadiumBuild.update({
          where: {
            id: validatedBuild.id,
          },
          data: {
            roundInfos: {
              update: {
                where: {
                  id: roundInfoId,
                },
                data: {
                  ...topLevelRoundInfo,
                },
              },
            },
          },
        });

        // Update sections of this round info
        for (const [sectionIndex, section] of roundInfo.sections.entries()) {
          // Update top-level section info
          const { power, purchasedItems, soldItems, ...sectionTopLevel } = section;
          const { id: sectionId } = await tx.roundInfoSection.findFirstOrThrow({
            where: {
              AND: [{ parentRoundInfoId: roundInfoId }, { orderIndex: sectionIndex }],
            },
            select: {
              id: true,
            },
          });
          await tx.roundInfoSection.update({
            where: {
              id: sectionId,
            },
            data: {
              ...sectionTopLevel,
              power: power
                ? {
                    connect: { id: power?.id },
                  }
                : undefined,
              purchasedItems: {
                set: purchasedItems.map((item) => ({ id: item.id })),
              },
              soldItems: {
                set: soldItems.map((item) => ({ id: item.id })),
              },
            },
          });
        }
      }

      updatedBuild = await tx.stadiumBuild.findFirstOrThrow({
        where: { id: validatedBuild.id },
        include: FullStadiumBuildInclude,
      });
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ message: String(error) }), { headers, status: 500 });
  }

  const response = {
    newBuild: updatedBuild!,
  };

  return new Response(JSON.stringify(response), { headers });
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

function validateNewBuild(build: BuildData): z.infer<typeof BuildDataSchema> {
  const { success, data, error } = BuildDataSchema.safeParse(build, { errorMap: BuildErrorMap });

  if (!success) {
    throw error;
  }

  return data;
}

function validateExistingBuild(build: BuildData): z.infer<typeof ExistingBuildDataSchema> {
  const { success, data, error } = ExistingBuildDataSchema.safeParse(build, {
    errorMap: BuildErrorMap,
  });

  if (!success) {
    throw error;
  }

  return data;
}

async function isUserAuthorOfBuild(userId: string, buildId: string): Promise<boolean> {
  const serverFetchedBuild = await prisma.stadiumBuild.findFirstOrThrow({
    where: { id: buildId },
  });

  return userId == serverFetchedBuild.id;
}
