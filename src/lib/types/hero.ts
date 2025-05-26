export const HeroRole = {
  Tank: "Tank",
  Damage: "Damage",
  Support: "Support",
} as const;
export type HeroRole = (typeof HeroRole)[keyof typeof HeroRole];

export type HeroData = {
  name: HeroName;
  role: HeroRole;
  baseHealth: number;
  baseArmor?: number;
  baseShields?: number;
};

export const HeroNames = [
  "D.Va",
  "Junker Queen",
  "Orisa",
  "Reinhardt",
  "Zarya",
  "Ashe",
  "Cassidy",
  "Genji",
  "Mei",
  "Reaper",
  "Soldier: 76",
  "Ana",
  "Juno",
  "Kiriko",
  "Lúcio",
  "Mercy",
  "Moira",
  "Freja",
] as const;
export type HeroName = (typeof HeroNames)[number];
export function isHeroName(str: string): str is HeroName {
  return HeroNames.includes(str as HeroName);
}
