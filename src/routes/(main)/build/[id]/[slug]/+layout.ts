import type { FullStadiumBuild } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";
import { buildPath } from "$src/lib/utils/routes.js";
import { toSlug } from "$src/lib/utils/slug.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  let build: FullStadiumBuild;
  try {
    build = await api<FullStadiumBuild>(`/build/${params.id}`, {}, fetch);
  } catch (e) {
    if (typeof e == "object" && e && "status" in e && e.status === 404) {
      error(404, "Build not found");
    }
    throw e;
  }

  // Slug in the param did not match the slug derived from the title.
  // Could be because it was entered in the URL wrong, or because the title changed.
  if (toSlug(build.buildTitle) !== params.slug) redirect(301, buildPath(build));

  return {
    build,
  };
}
