import { api } from "$lib/utils/api.js";
import type { FullItem } from "$src/lib/types/build.js";

export async function load({ fetch }) {
  const items = (await api<FullItem[]>(`/talents/items`, {}, fetch)) || [];

  return {
    items,
  };
}
