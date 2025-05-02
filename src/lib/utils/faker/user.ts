import { faker } from "@faker-js/faker";
import type { Prisma } from "$src/generated/prisma";

export function createRandomUser(): Prisma.UserCreateInput {
  return {
    username: faker.person.fullName(),
    oauthId: faker.string.uuid(),
  };
}
