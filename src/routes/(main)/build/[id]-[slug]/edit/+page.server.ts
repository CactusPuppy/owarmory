import type { Tag } from "$src/generated/prisma/client.js";
import type { Item, Power } from "$src/generated/prisma/index.js";
import type { BuildData } from "$src/lib/types/build.js";
import { isHeroName } from "$src/lib/types/hero.js";
import { api } from "$src/lib/utils/api.js";
import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const build = await api<BuildData>(`/build/${params.id}`, {}, fetch);

  if (!isHeroName(build.heroName)) error(500, "Unknown hero name from build " + params.id);
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
