import type { FullStadiumBuild as Build } from "$lib/types/build";
import { api } from "$lib/utils/api.js";
import type { Tag } from "$src/generated/prisma/client.js";
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
  const { label } = params;

  const tags = (await api<Tag[]>(`/tags`, {}, fetch)) || [];
  const tag = tags.find((i) => i.label === label);

  if (!tag) error(404, { message: "Tag not found" });

  const builds = (await api<Build[]>(`/builds/tag/${tag.id}`, {}, fetch)) || [];

  return {
    tags,
    builds,
    label,
  };
}
