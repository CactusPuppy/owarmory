import { z, ZodError } from "zod";

import { BuildErrorMap } from "$src/lib/utils/build.js";
import { BuildDataSchema, type BuildData, type ValidatedBuildData } from "$src/lib/types/build.js";
import { prisma } from "$src/database/prismaClient.server.js";
import type { Prisma, StadiumBuild, User } from "$src/generated/prisma/client.js";

const headers = { "Content-Type": "application/json" };

export async function POST({ locals, request }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;

  if (!currentUser)
    return new Response(JSON.stringify({ message: "Must be logged in to create a build!" }), {
      headers,
    });

  const build: BuildData = await request.json();
  let validatedBuild: ValidatedBuildData;

  try {
    validatedBuild = validate(build);
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

  // Pretend to post `data` to the DB
  let newBuild: StadiumBuild;
  try {
    newBuild = await prisma.stadiumBuild.create({
      data: {
        buildTitle: validatedBuild.buildTitle,
        authorId: currentUser.id,
        heroName: validatedBuild.heroName,
        additionalNotes: validatedBuild.additionalNotes,
        tags: {
          connect: validatedBuild.tags.map((tagId) => ({ id: Number(tagId) })),
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

export async function PATCH({ request }) {
  const build: BuildData = await request.json();

  // Pretend to fetch the build to PATCH
  await new Promise((res) => setTimeout(res, 500));

  try {
    validate(build);
  } catch (error: unknown) {
    // @ts-expect-error unknown type does not have message
    return new Response(JSON.stringify({ message: error.message }), { headers, status: 500 });
  }

  // Pretend to post `data` to the DB
  await new Promise((res) => setTimeout(res, 500));

  const response = {};

  return new Response(JSON.stringify(response), { headers });
}

function validate(build: BuildData): z.infer<typeof BuildDataSchema> {
  const { success, data, error } = BuildDataSchema.safeParse(build, { errorMap: BuildErrorMap });

  if (!success) {
    throw error;
  }

  return data;
}
