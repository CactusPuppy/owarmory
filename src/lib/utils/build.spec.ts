import { describe, it, expect, beforeAll } from "vitest";
import { filterUniqueBuilds, ZodIssuePathInBuildToHumanString } from "./build";
import { FullStadiumBuildInclude, type FullStadiumBuild } from "../types/build";
import { faker } from "@faker-js/faker";
import { createRandomBuild } from "./faker/build";
import { heroes } from "../constants/heroData";
import { prisma } from "$src/database/testPrismaClient.server";
import { createRandomUser } from "./faker/user";

describe("ZodIssuePathInBuildToHumanString", () => {
  it("Returns the first element with just one item", () => {
    expect(ZodIssuePathInBuildToHumanString(["title"])).toBe("Title");
    expect(ZodIssuePathInBuildToHumanString(["heroName"])).toBe("Hero Name");

    // Special case: convert "roundInfos" to "Rounds"
    expect(ZodIssuePathInBuildToHumanString(["roundInfos"])).toBe("Rounds");
  });

  it("Numbers the round correctly", () => {
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 0])).toBe("Round 1");
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 1])).toBe("Round 2");
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 6])).toBe("Round 7");
  });

  it("Labels field of round info correctly", () => {
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 0, "orderIndex"])).toBe(
      "Round 1: Order Index",
    );
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 2, "note"])).toBe("Round 3: Note");
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 5, "sections"])).toBe(
      "Round 6: Sections",
    );
  });

  it("Labels deeply nested fields correctly", () => {
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 0, "sections", 2])).toBe(
      "Round 1: Section 3",
    );
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 2, "sections", 0, "title"])).toBe(
      "Round 3: Section 1: Title",
    );
    expect(ZodIssuePathInBuildToHumanString(["roundInfos", 4, "sections", 1, "power", "id"])).toBe(
      "Round 5: Section 2: Power: Id",
    );
  });
});

describe("filterUniqueBuilds", () => {
  beforeAll(async () => {
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
                faker.helpers.arrayElement(
                  heroes.map((hero) => ({ baseArmor: 0, baseShields: 0, ...hero })),
                ),
                {
                  items,
                  powers,
                },
              ),
            }),
          ),
      );
    });
  });

  it("Returns an empty array when given an empty array", () => {
    expect(filterUniqueBuilds([])).toEqual([]);
  });

  it("Returns the same array when all builds have unique IDs", async () => {
    const builds = await prisma.stadiumBuild.findMany({ include: FullStadiumBuildInclude });
    expect(filterUniqueBuilds(builds)).toEqual(builds);
  });

  it("Filters out builds with duplicate IDs", async () => {
    let builds = await prisma.stadiumBuild.findMany({ include: FullStadiumBuildInclude });
    builds = builds.reduce((acc, next) => {
      if (faker.number.float() < 0.1) {
        acc.push(next);
      }
      acc.push(next);
      return acc;
    }, [] as FullStadiumBuild[]);
    const expected = new Set(builds.map((build) => build.id));
    expect(filterUniqueBuilds(builds).map((build) => build.id)).toEqual(Array.from(expected));
  });
});
