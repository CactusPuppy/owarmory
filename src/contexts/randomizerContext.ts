import { SimpleFaker } from "@faker-js/faker";
import { getContext, setContext } from "svelte";

const key = "randomizer-rng";

export function setRandomizerContext(seed: number) {
  setContext(key, new SimpleFaker({ seed }));
}

export function getRandomizerContext(): SimpleFaker {
  return getContext<SimpleFaker>(key);
}
