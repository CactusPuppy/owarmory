import { prisma } from "$src/database/prismaClient.server.js";
import { headers } from "$lib/constants/api";

export async function GET() {
  const tags = await prisma.tag.findMany();

  return new Response(JSON.stringify(tags), { headers });
}
