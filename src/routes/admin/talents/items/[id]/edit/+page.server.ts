import { prisma } from "$src/database/prismaClient.server";
import type { Actions } from "./$types";
import { ItemSchema } from "$src/lib/types/build";

export const actions = {
  default: async ({ params, request }) => {
    const itemId = params.id;
    const formData = await request.formData();

    await prisma.item.findFirstOrThrow({ where: { id: itemId } });

    const potentialData = {
      name: formData.get("name")?.toString(),
      category: formData.get("category")?.toString(),
      rarity: formData.get("rarity")?.toString(),
      cost: Number.parseInt(formData.get("cost")?.toString() ?? "", 10),
      iconURL: formData.get("iconURL")?.toString(),
      description: formData.get("description")?.toString(),
    };

    const data = ItemSchema.parse(potentialData);

    prisma.$transaction(async (tx) => {
      await tx.item.update({
        where: {
          id: itemId,
        },
        data,
      });
    });
  },
} satisfies Actions;
