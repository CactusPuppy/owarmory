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

export const PresetStats: Stat[] = (
  [
    {
      GUID: "00000001029C.01C",
      Name: "Ability Lifesteal",
      Description: "Restores health based on how much damage you deal with your Abilities.",
    },
    {
      GUID: "00000000F09D.01C",
      Name: "Ability Power",
      Description:
        "Increases the damage and healing of your Abilities and Ultimates that don't rely on your Weapon.\n\r\nCheck your <fg#ffffffff>Hero Information</fg> screen to learn more about your Abilities.",
    },
    {
      GUID: "00000000D410.01C",
      Name: "Attack Speed",
      Description: "Increases the rate of fire of your Weapon.",
    },
    {
      GUID: "00000000D410.01C",
      Name: "Attack Speed",
      Description: "Increases the rate of fire of your Weapon.",
    },
    {
      GUID: "0000000000C7.01C",
      Name: "Health",
      OverrideIconName: "Life",
      Description:
        "The combined total of your Health, Armor, and Shields.\r\n\nShields begin regenerating earlier.\r\n\nArmor has flat damage reduction.",
    },
  ] as Omit<
    Partial<Pick<Stat, "Hidden" | "OverrideIconName">> & Omit<Stat, "Hidden" | "OverrideIconName">,
    "StatType"
  >[]
).map(
  (data): Stat => ({
    StatType: "Preset",
    Hidden: false,
    OverrideIconName: null,
    ...data,
  }),
);

export const CustomStats: CustomStat[] = (
  [
    {
      Name: "Armor",
      OverrideIconName: "Life",
    },
    {
      Name: "Shields",
      OverrideIconName: "Life",
    },
    {
      Name: "Health, Armor, Shields",
      OverrideIconName: "Life",
    },
    {
      Name: "Max Ammo",
    },
    {
      Name: "Increased Damage to Barriers",
    },
    {
      Name: "Starting Ultimate Charge",
    },
    {
      Name: "Incoming Negative Effect Duration",
    },
    {
      Name: "Boosters Duration",
    },
    {
      Name: "Knockback Resist",
    },
    {
      Name: "Ultimate Cost Reduction",
    },
    {
      Name: "[Commanding Shout] Radius",
    },
    {
      Name: "[Commanding Shout] Overhealth",
    },
    {
      Name: "[Javeling Spin] Duration",
    },
    {
      Name: "[Fortify] Duration",
    },
    {
      Name: "[Fire Strike] Radius",
    },
    {
      Name: "[Fire Strike] Projectile Speed",
    },
    {
      Name: "[Barrier Field] Health",
    },
    {
      Name: "[Barrier Field] Size",
    },
    {
      Name: "[Projected Barrier] Range",
    },
    {
      Name: "[Barrier] Duration",
    },
    {
      Name: "[Dynamite] Explosion Radius",
    },
    {
      Name: "s [Dragonblade] Duration", // NOT a typo!
    },
    {
      Name: "Move Speed during [Deflect]",
    },
    {
      Name: "[Swift Strike] Width",
    },
    {
      Name: "[Deflect] Duration",
    },
    {
      Name: "[Death Blossom] Radius",
    },
    {
      Name: "Move Speed during [Death Blossom]",
    },
    {
      Name: "Move Speed during [Wraith Form]",
    },
    {
      Name: "[Wraith Form] Duration",
    },
    {
      Name: "[Biotic Field] Duration",
    },
    {
      Name: "Reduced [Helix Rocket] Self-Damage",
    },
    {
      Name: "[Biotic Field] Radius",
    },
    {
      Name: "[Sprint] Move Speed",
    },
    {
      Name: "[Biotic Grenade] Duration",
    },
    {
      Name: "Faster Scope Speed",
    },
    {
      Name: "[Biotic Grenade] Radius",
    },
    {
      Name: "[Nano Boost] Duration",
    },
    {
      Name: "[Pulsar Torpedoes] Projectile Speed",
    },
    {
      Name: "[Hyper Ring] Duration",
    },
    {
      Name: "[Glide Boost] Duration",
    },
    {
      Name: "[Healing Ofuda] Projectile Speed",
    },
    {
      Name: "[Kitsune Rush] Duration",
    },
    {
      Name: "[Amp It Up] Duration",
    },
    {
      Name: "[Caduceus Staff] Range",
    },
    {
      Name: "[Guardian Angel] Range",
    },
    {
      Name: "[Resurrection] Range",
    },
    {
      Name: "[Guardian Angel] Move Speed",
    },
    {
      Name: "[Caduceus Staff] Damage Boost",
    },
    {
      Name: "Ultimate Charge from Damage Boost",
    },
    {
      Name: "Max [Biotic Energy]",
    },
    {
      Name: "[Biotic Grasp] Secondary Fire Range",
    },
    {
      Name: "[Biotic Orb] Tendril Range",
    },
  ] as Omit<
    Partial<Pick<CustomStat, "Hidden" | "Description" | "OverrideIconName">> &
      Omit<CustomStat, "Hidden" | "Description" | "OverrideIconName">,
    "StatType" | "GUID"
  >[]
).map(
  (data, i): CustomStat => ({
    StatType: "Custom",
    GUID: `FAKE${i.toString(10).padStart(8, "0")}.ABC`,
    Hidden: false,
    Description: null,
    OverrideIconName: null,
    ...data,
  }),
);

export const StatsByGUID: Record<GUID, Stat | CustomStat> = Object.fromEntries(
  [...PresetStats, ...CustomStats].map((stat) => [stat.GUID, stat]),
);

type GUID = `${string}.${string}`;
export const StatSchema = z.object({
  StatType: z.literal("Preset"),
  GUID: z.string().refine((s): s is GUID => /^[A-Z0-9]{12}\.[A-Z0-9]{3}$/.test(s)),
  Name: z.string(),
  OverrideIconName: z.string().nullable(),
  Description: z.string().nullable(),
  Hidden: z.boolean(),
});
export type Stat = z.infer<typeof StatSchema>;
export const CustomStatSchema = z.object({
  StatType: z.literal("Custom"),
  GUID: z.string().refine((s): s is GUID => /^[A-Z0-9]{12}\.[A-Z0-9]{3}$/.test(s)),
  Name: z.string(),
  Description: z.string().nullable(),
  OverrideIconName: z.string().nullable(),
  Hidden: z.boolean(),
});
export type CustomStat = z.infer<typeof CustomStatSchema>;

export const StatModSchema = z.object({
  stat: StatSchema,
  amount: z.number(),
});
export type StatMod = z.infer<typeof StatModSchema>;

export const DefaultStatIconPath = `/images/stats/Default.webp`;
