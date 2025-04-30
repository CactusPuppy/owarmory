import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { heroes } from "../src/lib/constants/heroData";
import { createRandomUser } from "../src/lib/utils/faker/user";
import { createRandomBuild } from "../src/lib/utils/faker/build";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Beginning faker transaction...");
  prisma.$transaction(async (tx) => {
    const items = await tx.item.findMany();
    const powers = await tx.power.findMany();
    const SEED_USER_COUNT = 5;
    console.log(`Creating ${SEED_USER_COUNT} fake users...`);
    const users = await tx.user.createManyAndReturn({
      data: Array(SEED_USER_COUNT)
        .fill(0)
        .map((_) => createRandomUser()),
    });

    const SEED_BUILD_COUNT = 64;
    console.log(`Creating ${SEED_BUILD_COUNT} fake builds...`);
    await Promise.all(
      Array(SEED_BUILD_COUNT)
        .fill(0)
        .map((_) =>
          tx.stadiumBuild.create({
            data: createRandomBuild(
              faker.helpers.arrayElement(users),
              faker.helpers.arrayElement(heroes),
              {
                items,
                powers,
              },
            ),
          }),
        ),
    );
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
