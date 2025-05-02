import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";

describe("GeneratePurchaseSelections test", () => {
  const seed = faker.seed();
  console.log("Running Faker with seed:", seed);

  it("does not repeat any items without first selling them", () => {
    // FIXME
    expect(1 + 1).toBe(2);
  });
});
