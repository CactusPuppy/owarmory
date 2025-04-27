import type { Build } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";

export async function load({ url, fetch }) {
  const page = parseInt(url.searchParams.get("page") || "1");
  const builds = (await api<Build[]>(`builds/latest?page=${page}`, fetch)) || [];

  return {
    builds,
    page,
  };
}
