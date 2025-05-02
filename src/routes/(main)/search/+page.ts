import type { FullStadiumBuild as Build } from "$lib/types/build";
import { api } from "$lib/utils/api.js";

export async function load({ url, fetch }) {
  const query = url.searchParams.get("query") || "";

  const builds = (await api<Build[]>(`builds/search`, { query }, fetch)) || [];

  return {
    builds,
    query,
  };
}
