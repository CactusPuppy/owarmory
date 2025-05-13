import type { Tag } from "$src/generated/prisma/client.js";
import type { Item, Power } from "$src/generated/prisma/index.js";
import type { FullStadiumBuild } from "$src/lib/types/build.js";
import { isHeroName } from "$src/lib/types/hero.js";
import { api } from "$src/lib/utils/api.js";
import { buildPath } from "$src/lib/utils/routes.js";
import { error, redirect } from "@sveltejs/kit";

export async function load({ locals, params, fetch }) {
  const session = await locals.auth();
  const user = session?.user;
  const build = await api<FullStadiumBuild>(`/build/${params.id}`, {}, fetch);

  if (!isHeroName(build.heroName)) error(500, "Unknown hero name from build " + params.id);
  if (!user || user.id !== build.authorId) redirect(303, buildPath(build));
  const [items, powers, tags] = await Promise.all([
    api<Item[]>("/talents/items", { hero: build.heroName }, fetch),
    api<Power[]>("/talents/powers", { hero: build.heroName }, fetch),
    api<Tag[]>("/tags", {}, fetch),
  ]);

  return {
    tags,
    availableTalents: {
      items,
      powers,
    },
  };
}
