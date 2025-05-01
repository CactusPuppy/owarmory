import { prisma } from "$src/database/prismaClient.server.js";
import { headers } from "$src/lib/constants/api";

export async function GET({ params }) {
  const { name } = params;
  const user = await prisma.user.findFirst({ where: { name } });

  if (!user) {
    return new Response(JSON.stringify({ status: "Error" }), { headers, status: 404 });
  }

  return new Response(JSON.stringify(user), { headers });
}
