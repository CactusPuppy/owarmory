import { DATABASE_URL } from "$env/static/private";
import { PrismaClient } from "$src/generated/prisma";

export const prisma = new PrismaClient({
  datasourceUrl: DATABASE_URL,
});
