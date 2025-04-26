import type { HeroName } from "./hero";

// Temporary type, will look different
export type Build = {
  hero: HeroName;
  title: string;
  introduction?: string;
  author: User;
};
