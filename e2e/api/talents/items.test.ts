import { expect, test } from "@playwright/test";
import { prisma } from "../../../src/database/prismaClient.server";
import { HeroNames } from "../../../src/lib/types/hero";
import { faker } from "@faker-js/faker";
import { FullItemInclude } from "../../../src/lib/types/build";

test("returns all items with no params passed", async ({ request }) => {
  const expected = await prisma.item.findMany({
    include: FullItemInclude,
  });
  const actual = await (await request.get("/api/talents/items")).json();

  expect(actual).toEqual(expected);
});

test("returns only expected items with a hero parameter passed", async ({ request }) => {
  const hero = faker.helpers.arrayElement(HeroNames);
  console.log("Chose to filter for items belonging to", hero);
  const expected = await prisma.item.findMany({
    where: {
      OR: [
        {
          heroName: hero,
        },
        {
          heroName: null,
        },
      ],
    },
    include: FullItemInclude,
  });
  const actual = await (
    await request.get("/api/talents/items?hero=" + encodeURIComponent(hero))
  ).json();

  expect(actual).toEqual(expected);
});
