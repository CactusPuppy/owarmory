import type { FullStadiumBuild as Build } from "$lib/types/build.js";
import { api } from "$lib/utils/api.js";
import type { User } from "$src/generated/prisma/client.js";
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
  const { name } = params;

  let user;
  try {
    user = await api<User>(`user/${encodeURIComponent(name)}`, {}, fetch);
  } catch {
    error(404, { message: "User not found" });
  }

  const builds = (await api<Build[]>(`builds/user/${user.id}`, {}, fetch)) || [];

  return {
    builds,
    name,
  };
}
