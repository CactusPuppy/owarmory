import { getContext, setContext } from "svelte";
import type { BuildData } from "$src/lib/types/build";

const key = "build";

export function setBuildContext(build: BuildData) {
  setContext(key, JSON.stringify(build));
}

export function getBuildContext() {
  return JSON.parse(getContext(key)) as BuildData;
}
