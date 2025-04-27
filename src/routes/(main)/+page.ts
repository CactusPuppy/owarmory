import type { Build } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";

export async function load({ fetch }) {
  const latestBuilds = (await api<Build[]>("builds/latest", fetch)) || [];

  return {
    latestBuilds,
  };
}
