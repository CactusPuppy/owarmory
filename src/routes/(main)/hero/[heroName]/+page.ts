import type { FullStadiumBuild as Build } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";

export async function load({ fetch, params }) {
  const { heroName } = params;

  const builds =
    (await api<Build[]>(`builds/hero/${encodeURIComponent(heroName)}`, {}, fetch)) || [];

  return {
    builds,
    heroName,
  };
}
