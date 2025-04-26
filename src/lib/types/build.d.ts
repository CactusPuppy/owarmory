import type { HeroData } from "./hero";

// Temporary type, will look different
export type Build = {
  hero: HeroData;
  title: string;
  introduction?: string;
  description?: string;
  author: User;
  roundInfos: RoundInfo[];
};

export type RoundInfo = {
  id: string;
  note: string;
  sections: RoundInfoSection[];
};

export type RoundInfoSection = {
  id: string;
  title: string;
  power: object | null;
  items: object[];
};
