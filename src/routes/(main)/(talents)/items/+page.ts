import { api } from "$lib/utils/api.js";
import type { Item } from "$src/generated/prisma/client.js";

export async function load({ fetch }) {
  const items = (await api<Item[]>(`/talents/items`, {}, fetch)) || [];

  return {
    items,
  };
}
