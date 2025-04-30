import type { FullStadiumBuild as Build } from "$lib/types/build";
import { api } from "$lib/utils/api.js";

export async function load({ url, fetch }) {
  const page = parseInt(url.searchParams.get("page") || "1");
  // subtracting one since the API endpoint expects zero-indexing
  const builds =
    (await api<Build[]>(`builds/latest`, { page: (page - 1).toString(10) }, fetch)) || [];

  return {
    builds,
    page,
  };
}
