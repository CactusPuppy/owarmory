import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants/auth";
import type { User } from "$src/generated/prisma";

export async function load({ cookies }) {
  const authToken = cookies.get(AUTH_TOKEN_COOKIE_NAME);

  let currentUser: User | null = null;

  if (authToken) {
    // Pretend to get user
    currentUser = {
      id: "cuid2345679",
      username: "some-user#1234",
      oauthId: "bca0d6cc-d47d-4e67-8ca2-57d13af97d80",
    };
  }

  return {
    currentUser,
  };
}
