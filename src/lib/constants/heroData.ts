import type { HeroData, HeroName } from "../types/hero";

export const heroes: HeroData[] = [
  {
    name: "D.Va",
    role: "Tank",
    baseHealth: 225,
    baseArmor: 325,
  },
  {
    name: "Junker Queen",
    role: "Tank",
    baseHealth: 375,
  },
  {
    name: "Orisa",
    role: "Tank",
    baseHealth: 150,
    baseArmor: 325,
  },
  {
    name: "Reinhardt",
    role: "Tank",
    baseHealth: 250,
    baseArmor: 300,
  },
  {
    name: "Zarya",
    role: "Tank",
    baseHealth: 175,
    baseShields: 225,
  },
  {
    name: "Ashe",
    role: "Damage",
    baseHealth: 250,
  },
  {
    name: "Cassidy",
    role: "Damage",
    baseHealth: 275,
  },
  {
    name: "Freja",
    role: "Damage",
    baseHealth: 225,
  },
  {
    name: "Genji",
    role: "Damage",
    baseHealth: 250,
  },
  {
    name: "Mei",
    role: "Damage",
    baseHealth: 300,
  },
  {
    name: "Reaper",
    role: "Damage",
    baseHealth: 300,
  },
  {
    name: "Soldier: 76",
    role: "Damage",
    baseHealth: 250,
  },
  {
    name: "Ana",
    role: "Support",
    baseHealth: 250,
  },
  {
    name: "Juno",
    role: "Support",
    baseHealth: 75,
    baseShields: 150,
  },
  {
    name: "Kiriko",
    role: "Support",
    baseHealth: 225,
  },
  {
    name: "Lúcio",
    role: "Support",
    baseHealth: 225,
  },
  {
    name: "Mercy",
    role: "Support",
    baseHealth: 225,
  },
  {
    name: "Moira",
    role: "Support",
    baseHealth: 225,
  },
];

export const heroFromHeroName = (heroName: HeroName): HeroData =>
  heroes.find((heroDatum) => heroDatum.name == heroName) ?? {
    name: "Unknown Hero" as HeroName,
    role: "Damage",
    baseHealth: 0,
  };
