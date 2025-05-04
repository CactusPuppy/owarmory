import type { FullStadiumBuild } from "../types/build";
import { toSlug } from "./slug";

export function buildPath(build: Pick<FullStadiumBuild, "id" | "buildTitle">): string {
  return `/build/${build.id}-${toSlug(build.buildTitle)}`;
}

export function buildEditPath(build: FullStadiumBuild): string {
  return buildPath(build) + "/edit";
}
