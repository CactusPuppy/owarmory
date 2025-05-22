import { z } from "zod";

export const StatNames = [
  "Ability Lifesteal",
  "Ability Power",
  "Attack Speed",
  "Cooldown Reduction",
  "Critical Damage",
  "Life",
  "Max Ammo",
  "Melee Damage",
  "Move Speed",
  "Reload Speed",
  "Weapon Lifesteal",
  "Weapon Power",
];

// CUSTOM TYPE: pink star with just a description

export const StatOverrides: OverrideStat[] = [
  {
    StatType: "Preset",
    Name: "Ability Lifesteal",
    Description: "Restores health based on how much damage you deal with your Abilities.",
  },
  {
    StatType: "Preset",
    Name: "Ability Power",
    Description:
      "Increases the damage and healing of your Abilities and Ultimates that don't rely on your Weapon.",
  },
  {
    StatType: "Preset",
    Name: "Attack Speed",
    Description: "Increases the rate of fire of your Weapon.",
  },
  {
    StatType: "Preset",
    Name: "Cooldown Reduction",
    Description: "Reduces the time you must wait after using an ability before it is usable again.",
  },
  {
    StatType: "Preset",
    Name: "Critical Damage",
    Description: "Increases the damage you deal with Critical Hits.",
  },
  {
    StatType: "Preset", // Should this be custom?
    Name: "Shields",
    OverrideIconName: "Life",
  },
  {
    StatType: "Preset", // Should this be custom?
    Name: "Health, Armor, Shields",
    OverrideIconName: "Life",
  },
  {
    StatType: "Preset",
    Name: "Life",
    Description:
      "The combined total of your Health, Armor, and Shields.\r\n\nShields begin regenerating earlier.\r\n\nArmor has flat damage reduction.",
  },
  {
    StatType: "Preset", // Should this be custom?
    Name: "Armor",
    OverrideIconName: "Life",
  },
  {
    StatType: "Preset",
    Name: "Max Ammo",
    Description: "Increases the maximum ammo capacity of your Weapon.",
  },
  {
    StatType: "Preset",
    Name: "Melee Damage",
    Description: "Increases the damage of Quick Melee and Melee Weapons.",
  },
  {
    StatType: "Preset",
    Name: "Move Speed",
    Description: "Increases how fast you move.",
  },
  {
    StatType: "Preset",
    Name: "Reload Speed",
    Description: "Increases how fast you reload your Weapon.",
  },
  {
    StatType: "Preset",
    Name: "Weapon Lifesteal",
    Description: "Restores health based on how much damage you deal with your Weapon.",
  },
  {
    StatType: "Preset",
    Name: "Weapon Power",
    Description: "Increases the damage and healing of your Weapon.",
  },
];

export const OverrideStatSchema = z.object({
  StatType: z.enum(["Custom", "Preset"]),
  Name: z.string(),
  Description: z.string().optional(),
  OverrideIconName: z.string().optional().nullable(),
});
export type OverrideStat = z.infer<typeof OverrideStatSchema>;

export const DefaultStatIconPath = `/images/stats/Default.webp`;
