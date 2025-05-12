import type { Stat } from "$src/generated/prisma";
import { api } from "$src/lib/utils/api";

export async function load({ fetch }) {
  const stats = (await api<Stat[]>("/stats", { major: "true" }, fetch)) || [];

  return {
    stats,
  };
}
