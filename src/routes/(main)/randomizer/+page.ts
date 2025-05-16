import type { Power } from "$src/generated/prisma/client.js";
import type { FullItem } from "$src/lib/types/build";
import { api } from "$src/lib/utils/api";

export async function load({ fetch }) {
  const [allItems, allPowers] = await Promise.all([
    api<FullItem[]>("/talents/items", {}, fetch),
    api<Power[]>("/talents/powers", {}, fetch),
  ]);

  return {
    allItems,
    allPowers,
  };
}
