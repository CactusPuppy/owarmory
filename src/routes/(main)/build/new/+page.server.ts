import type { Item, Power } from "$src/generated/prisma";
import { api } from "$src/lib/utils/api";

export async function load({ fetch }) {
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
