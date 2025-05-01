import { prisma } from "$src/database/prismaClient.server.js";

export async function GET({ params }) {
  const headers = { "Content-Type": "application/json" };

  const { name } = params;
  const user = await prisma.user.findFirst({ where: { name } });

  if (!user) {
    return new Response(JSON.stringify({ status: "Error" }), { headers, status: 404 });
  }

  return new Response(JSON.stringify(user), { headers });
}
