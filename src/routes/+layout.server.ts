import type { User } from "$src/generated/prisma";

export async function load({ locals }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;

  return {
    currentUser,
  };
}
