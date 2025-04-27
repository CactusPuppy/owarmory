import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants/auth.js";
import type { User } from "$src/generated/prisma";

export async function load({ cookies }) {
  const authToken = cookies.get(AUTH_TOKEN_COOKIE_NAME);

  let currentUser: User | null = null;

  if (authToken) {
    // Pretend to get user
    currentUser = { username: "some-user#1234" };
  }

  return {
    currentUser,
  };
}
