import type { Item, Power, Tag, User } from "$src/generated/prisma";
import { api } from "$src/lib/utils/api";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, fetch }) {
  const session = await locals.auth();

  const currentUser: User | null = (session?.user as User) || null;
  if (!currentUser) redirect(307, "/");

  const [items, powers, tags] = await Promise.all([
    api<Item[]>("/talents/items", {}, fetch),
    api<Power[]>("/talents/powers", {}, fetch),
    api<Tag[]>("/tags", {}, fetch),
  ]);

  return {
    tags,
    availableTalents: {
      items,
      powers,
    },
  };
}
