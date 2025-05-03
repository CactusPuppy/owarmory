import type { FullStadiumBuild } from "../types/build";
import { toSlug } from "./slug";

export function buildPath(build: FullStadiumBuild) {
  return `/build/${build.id}-${toSlug(build.buildTitle)}`;
}
