import type { Item, Power, User } from "$src/generated/prisma";
import { api } from "$src/lib/utils/api";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, fetch }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;
  if (!currentUser) redirect(307, "/");

  const [items, powers] = await Promise.all([
    api<Item[]>("/talents/items", {}, fetch),
    api<Power[]>("/talents/powers", {}, fetch),
  ]);

  return {
    availableTalents: {
      items,
      powers,
    },
  };
}
