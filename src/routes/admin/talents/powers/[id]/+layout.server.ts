import { prisma } from "$src/database/prismaClient.server";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const power = await prisma.power.findFirst({ where: { id: params.id } });
  if (!power) error(404, { message: "Item not found" });

  return {
    power,
  };
}
