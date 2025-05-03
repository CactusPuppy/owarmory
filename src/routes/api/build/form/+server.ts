import { z, ZodError } from "zod";

import { BuildErrorMap } from "$src/lib/utils/build.js";
import { BuildDataSchema, type BuildData, type ValidatedBuildData } from "$src/lib/types/build.js";
import { prisma } from "$src/database/prismaClient.server.js";
import type { Prisma, StadiumBuild, User } from "$src/generated/prisma/client.js";

const headers = { "Content-Type": "application/json" };

export async function POST({ request }) {
  const build: BuildData = await request.json();
  let validatedBuild: ValidatedBuildData;

  try {
    validatedBuild = validate(build);
  } catch (error: unknown) {
    // @ts-expect-error unknown type does not have message
    return new Response(JSON.stringify({ message: error.message }), { headers, status: 500 });
  }

  // Pretend to post `data` to the DB
  await new Promise((res) => setTimeout(res, 500));

  const response = {};

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
