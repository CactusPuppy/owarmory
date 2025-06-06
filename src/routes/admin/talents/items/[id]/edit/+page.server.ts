import { prisma } from "$src/database/prismaClient.server";
import type { Actions } from "./$types";
import { FullItemInclude, ItemSchema } from "$src/lib/types/build";
import type { Prisma } from "$src/generated/prisma";
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ params, request }) => {
    const itemId = params.id;
    const formData = await request.formData();

    const item = await prisma.item.findFirstOrThrow({
      where: { id: itemId },
      include: FullItemInclude,
    });

    const potentialData: Prisma.ItemUncheckedUpdateInput = {
      name: formData.get("name")?.toString(),
      removed: !!formData.get("removed"),
      heroName: item.heroName,
      category: formData.get("category")?.toString(),
      rarity: formData.get("rarity")?.toString(),
      cost: Number.parseInt(formData.get("cost")?.toString() ?? "", 10),
      iconURL: formData.get("iconURL")?.toString(),
      description: formData.get("description")?.toString(),
    };

    const data = ItemSchema.omit({ id: true }).parse(potentialData);

    try {
      await prisma.$transaction(async (tx) => {
        await tx.item.update({
          where: {
            id: itemId,
          },
          data,
        });
        for (const statMod of item.statMods) {
          const newStatAmount = Number.parseInt(
            formData.get(`statModAmount-${statMod.orderIndex}`)?.toString() ?? "",
            10,
          );
          if (newStatAmount && newStatAmount != statMod.amount)
            await tx.statMod.update({
              where: {
                id: statMod.id,
              },
              data: {
                amount: newStatAmount,
              },
            });
        }
      });
    } catch (error) {
      return fail(400, { error: String(error) });
    }
    return { success: true };
  },
} satisfies Actions;
