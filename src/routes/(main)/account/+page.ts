import type { FullStadiumBuild as Build } from "$src/lib/types/build";
import { api } from "$lib/utils/api";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch, parent }) {
  const { currentUser } = await parent();
  if (!currentUser) redirect(303, "/");

  const latestUserBuilds = (await api<Build[]>(`/builds/user/${currentUser.id}`, {}, fetch)) || [];

  return {
    latestUserBuilds,
  };
}
