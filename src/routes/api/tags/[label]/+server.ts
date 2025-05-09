import { prisma } from "$src/database/prismaClient.server.js";
import { headers } from "$lib/constants/api";

export async function GET({ params }) {
  const tag = await prisma.tag.findFirstOrThrow({
    where: {
      label: params.label,
    },
  });

  return new Response(JSON.stringify(tag), { headers });
}
