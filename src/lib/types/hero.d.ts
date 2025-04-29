export const HeroRole = {
  Tank: "Tank",
  Damage: "Damage",
  Support: "Support",
} as const;
export type HeroRole = (typeof HeroRole)[keyof typeof HeroRole];

export type HeroData = {
  name: HeroName;
  role: HeroRole;
};

const HeroNames = [
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
] as const;
export type HeroName = (typeof HeroNames)[number];
