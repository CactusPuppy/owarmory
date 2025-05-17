import type { FullStadiumBuild } from "../types/build";
import { toSlug } from "./slug";

export function buildPath(build: Pick<FullStadiumBuild, "id" | "buildTitle">): string {
  return `/build/${build.id}/${toSlug(build.buildTitle)}`;
}

export function buildShortPath(build: Pick<FullStadiumBuild, "id">): string {
  return `/${build.id}`;
}

export function buildEditPath(build: Pick<FullStadiumBuild, "id" | "buildTitle">): string {
  return buildPath(build) + "/edit";
}
