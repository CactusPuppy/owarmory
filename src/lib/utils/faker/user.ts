import { faker } from "@faker-js/faker";
import type { Prisma } from "$src/generated/prisma";

export function createRandomUser(): Prisma.UserCreateInput {
  return {
    name: faker.person.fullName(),
  };
}
