import { HeroRole } from "$src/generated/prisma";
import type { HeroData, HeroName } from "../types/hero";

export const heroes: HeroData[] = [
  {
    name: "D.Va",
    role: "Tank",
  },
  {
    name: "Junker Queen",
    role: "Tank",
  },
  {
    name: "Orisa",
    role: "Tank",
  },
  {
    name: "Reinhardt",
    role: "Tank",
  },
  {
    name: "Zarya",
    role: "Tank",
  },
  {
    name: "Ashe",
    role: "Damage",
  },
  {
    name: "Cassidy",
    role: "Damage",
  },
  {
    name: "Genji",
    role: "Damage",
  },
  {
    name: "Mei",
    role: "Damage",
  },
  {
    name: "Reaper",
    role: "Damage",
  },
  {
    name: "Soldier: 76",
    role: "Damage",
  },
  {
    name: "Ana",
    role: "Support",
  },
  {
    name: "Juno",
    role: "Support",
  },
  {
    name: "Kiriko",
    role: "Support",
  },
  {
    name: "Lúcio",
    role: "Support",
  },
  {
    name: "Mercy",
    role: "Support",
  },
  {
    name: "Moira",
    role: "Support",
  },
];

export const heroFromHeroName = (heroName: HeroName): HeroData =>
  heroes.find((heroDatum) => heroDatum.name == heroName) ?? {
    name: "Unknown Hero" as HeroName,
    role: HeroRole.Damage,
  };
