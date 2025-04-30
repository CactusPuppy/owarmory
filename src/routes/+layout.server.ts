import { AUTH_TOKEN_COOKIE_NAME } from "$lib/constants/auth";
import type { User } from "$src/generated/prisma";
import { api } from "$src/lib/utils/api.js";

export async function load({ cookies, fetch }) {
  const authToken = cookies.get(AUTH_TOKEN_COOKIE_NAME);

  let currentUser: User | null = null;

  if (authToken) {
    // Pretend to get user
    currentUser = await api<User>("login", {}, fetch);
  }

  return {
    currentUser,
  };
}
