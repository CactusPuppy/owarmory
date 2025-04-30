import type { FullStadiumBuild as Build } from "$src/lib/types/build";
import { api } from "$lib/utils/api";

export async function load({ fetch }) {
  const latestUserBuilds = (await api<Build[]>("builds/user", {}, fetch)) || [];

  return {
    latestUserBuilds,
  };
}
