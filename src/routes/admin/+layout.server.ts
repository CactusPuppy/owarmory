import { UserRole, type User } from "$src/generated/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;

  if (currentUser.role !== UserRole.ADMIN) redirect(302, "/");
}
