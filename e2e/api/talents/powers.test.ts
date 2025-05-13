import { expect, test } from "@playwright/test";
import { prisma } from "../../../src/database/prismaClient.server";
import { HeroNames } from "../../../src/lib/types/hero";
import { faker } from "@faker-js/faker";

test("returns all powers with no params passed", async ({ request }) => {
  const expected = await prisma.power.findMany();
  const actual = await (await request.get("/api/talents/powers")).json();

  expect(actual).toEqual(expected);
});

test("returns only expected powers with a hero parameter passed", async ({ request }) => {
  const hero = faker.helpers.arrayElement(HeroNames);
  console.log("Chose to filter for powers belonging to", hero);
  const expected = await prisma.power.findMany({
    where: {
      heroName: hero,
    },
  });
  const actual = await (
    await request.get("/api/talents/powers?hero=" + encodeURIComponent(hero))
  ).json();

  expect(actual).toEqual(expected);
});
