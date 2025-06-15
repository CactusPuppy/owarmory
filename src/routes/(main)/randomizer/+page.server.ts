import { faker } from "@faker-js/faker";

export async function load() {
  const seed = faker.seed();
  return {
    seed,
  };
}
