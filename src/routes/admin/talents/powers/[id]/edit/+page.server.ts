import { prisma } from "$src/database/prismaClient.server";
import type { Actions } from "./$types";
import { PowerSchema } from "$src/lib/types/build";
import type { Prisma } from "$src/generated/prisma";
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ params, request }) => {
    const powerId = params.id;
    const formData = await request.formData();

    const power = await prisma.power.findFirstOrThrow({
      where: { id: powerId },
    });

    const potentialData: Prisma.PowerUncheckedUpdateInput = {
      name: formData.get("name")?.toString(),
      removed: !!formData.get("removed"),
      heroName: power.heroName,
      iconURL: formData.get("iconURL")?.toString(),
      description: formData.get("description")?.toString(),
    };

    const data = PowerSchema.omit({ id: true }).parse(potentialData);

    try {
      await prisma.$transaction(async (tx) => {
        await tx.power.update({
          where: {
            id: powerId,
          },
          data,
        });
      });
    } catch (error) {
      return fail(400, { error: String(error) });
    }
    return { success: true };
  },
} satisfies Actions;
