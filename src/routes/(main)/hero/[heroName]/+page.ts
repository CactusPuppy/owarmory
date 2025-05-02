import type { FullStadiumBuild as Build } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";
import { heroes } from "$src/lib/constants/heroData.js";
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
  const { heroName } = params;

  if (!heroes.some(({ name }) => name === heroName)) error(404, { message: "Hero not found" });

  const builds =
    (await api<Build[]>(`builds/hero/${encodeURIComponent(heroName)}`, {}, fetch)) || [];

  return {
    builds,
    heroName,
  };
}
