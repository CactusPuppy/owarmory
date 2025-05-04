import type { FullStadiumBuild } from "../types/build";
import { toSlug } from "./slug";

export function buildPath(build: Pick<FullStadiumBuild, "id" | "buildTitle">) {
  return `/build/${build.id}-${toSlug(build.buildTitle)}`;
}
