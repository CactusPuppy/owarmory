import { prisma } from "$src/database/prismaClient.server";
import type { Actions } from "./$types";
import { ItemSchema } from "$src/lib/types/build";
import type { Prisma } from "$src/generated/prisma";

export const actions = {
  default: async ({ params, request }) => {
    const itemId = params.id;
    const formData = await request.formData();

    const item = await prisma.item.findFirstOrThrow({ where: { id: itemId } });

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

    prisma
      .$transaction(async (tx) => {
        await tx.item.update({
          where: {
            id: itemId,
          },
          data,
        });
      })
      .catch((e) => console.error(e));
  },
} satisfies Actions;
