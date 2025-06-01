import { prisma } from "$src/database/prismaClient.server";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const item = await prisma.item.findFirst({ where: { id: params.id } });
  if (!item) error(404, { message: "Item not found" });

  return {
    item,
  };
}
