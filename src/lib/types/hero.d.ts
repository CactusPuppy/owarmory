import type { HeroRole } from "$src/generated/prisma";

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
