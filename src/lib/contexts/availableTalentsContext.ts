import { getContext, setContext } from "svelte";
import type { AvailableTalents } from "../utils/talents.server";

const key = "available-talents";

export function setAvailableTalentsContext(availableTalents: AvailableTalents) {
  setContext(key, availableTalents);
}

export function getAvailableTalentsContext() {
  return getContext(key) as AvailableTalents;
}
