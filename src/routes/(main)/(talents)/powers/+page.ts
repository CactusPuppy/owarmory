import { api } from "$lib/utils/api.js";
import type { Power } from "$src/generated/prisma/client.js";

export async function load({ fetch }) {
  const powers = (await api<Power[]>(`/talents/powers`, {}, fetch)) || [];

  return {
    powers,
  };
}
