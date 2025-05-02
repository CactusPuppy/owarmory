import type { FullStadiumBuild as Build } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";
import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const build = await api<Build>(`/build/${params.id}`, {}, fetch);

  if (!build) error(404, "Build not found");

  return {
    build,
  };
}
