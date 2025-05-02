import type { FullStadiumBuild } from "./build";

export type PageableBuildsSnapshot = {
  builds: FullStadiumBuild[];
  currentPage: number;
  scrollPosition: number;
};
