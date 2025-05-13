// import { DATABASE_URL } from "$env/static/private";
import "dotenv/config";
import { PrismaClient } from "$src/generated/prisma";

const DATABASE_URL = process.env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasourceUrl: DATABASE_URL,
});
