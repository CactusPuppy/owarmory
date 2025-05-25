import { promises } from "node:fs";
import { z } from "zod";
import { PrismaClient } from "../src/generated/prisma";
import { ItemRarity, ItemCategory, CleanStatInclude } from "../src/lib/types/build";
import { heroes } from "../src/lib/constants/heroData";
import { StatOverrides } from "../src/lib/constants/stats";
const { readFile } = promises;

type PrismaTransaction = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

const prisma = new PrismaClient();

const GuidValue = z.object({
  GUID: z.string(),
  Value: z.string(),
});

const Buff = z.object({
  StatType: z.string().optional(),
  GameValueGUID: z.string().optional(),
  IconGUID: z.string().optional(),
  Name: z.string(),
  Description: z.string().optional(),
  DescriptionFormatted: z.string().optional(),
  ShowPostDescription: z.boolean().optional(),
  Hidden: z.boolean().optional(),
  Value: z.number(),
  IsPercentage: z.boolean().optional(),
  OverrideIconName: z.string().optional(),
});

const StadiumTalent = z.object({
  GUID: z.string(),
  Name: z.string(),
  Description: z.string(),
  DescriptionFormatted: z.string().nullable(),
  Cost: z.number().nonnegative(),
  Hero: GuidValue.nullable(),
  Rarity: GuidValue,
  Category: GuidValue,
  Buffs: z.array(Buff),
  GameValues: z.array(z.any()),
});

const CustomStadiumTalent = z.object({
  GUID: z.string(),
  Name: z.string(),
  NameOverride: z.string().optional(),
  Description: z.string().optional(),
  DescriptionFormatted: z.string().nullable().optional(),
  Cost: z.number().nonnegative().optional(),
  Hero: GuidValue.nullable().optional(),
  Rarity: GuidValue.optional(),
  Category: GuidValue.optional(),
  Buffs: z.array(Buff).optional(),
});

const StadiumDataSchema = z.record(z.string(), StadiumTalent);
const CustomStadiumDataSchema = z.record(z.string(), CustomStadiumTalent);
type Talent = z.infer<typeof StadiumTalent>;
type CustomTalent = z.infer<typeof CustomStadiumTalent>;

async function createHeroes(tx: PrismaTransaction) {
  return await tx.hero.createMany({
    data: heroes.map((heroData) => ({
      name: heroData.name as string,
      role: heroData.role as string,
    })),
    skipDuplicates: true,
  });
}

async function main() {
  console.log("Beginning seed transaction...");
  prisma.$transaction(async (tx) => {
    console.log("Creating heroes...");
    await createHeroes(tx);
    const heroes = await tx.hero.findMany();

    console.log("Reading stadium data...");
    const stadiumData = StadiumDataSchema.parse(
      JSON.parse((await readFile("./prisma/seed-data/stadium-data.json")).toString()),
    );

    console.log("Reading custom stadium data...");
    const customStadiumData = CustomStadiumDataSchema.parse(
      JSON.parse((await readFile("./prisma/seed-data/custom-stadium-data.json")).toString()),
    );

    const itemCategoryValueToEnum: Record<string, ItemCategory> = {
      Ability: ItemCategory.Ability,
      Survival: ItemCategory.Survival,
      "Weapon Variants": ItemCategory.Weapon,
    };
    const itemRarityValueToEnum: Record<string, ItemRarity> = {
      Normal: ItemRarity.Common,
      Rare: ItemRarity.Rare,
      Epic: ItemRarity.Epic,
    };

    const existingStatMods = await tx.statMod.findMany();
    const processedStatMods = new Set<string>();

    for (const [index, [guid, talent]] of Object.entries(stadiumData).entries()) {
      console.log(
        `Processing talent ${guid} (${index + 1} / ${Object.values(stadiumData).length})`,
      );

      const customOverrideData = customStadiumData[guid];
      applyCustomTalentOverrideData(talent, customOverrideData);

      for (const buff of talent.Buffs) {
        const statOverrides = StatOverrides.find((stat) => stat.Name == buff.Name);
        // only stats with overrides should have descriptions
        buff.Description = undefined;

        if (statOverrides) {
          buff.StatType = statOverrides.StatType;
          buff.Description = statOverrides.Description;

          if (statOverrides.OverrideIconName) {
            buff.OverrideIconName = `/images/stats/${encodeURIComponent(statOverrides.OverrideIconName)}.webp`;
          } else if (buff.StatType == "Preset") {
            buff.OverrideIconName = `/images/stats/${encodeURIComponent(buff.Name)}.webp`;
          }
        }
      }

      const baseData = {
        name: talent.Name,
        gameGuid: talent.GUID,
        description: talent.DescriptionFormatted ?? talent.Description,
        iconURL: `/images/talents/${talent.Name.trim()}.png`,
        heroName: talent.Hero
          ? heroes.filter((hero) => hero.name === talent.Hero!.Value)![0].name
          : undefined,
      };

      if (talent.Category.Value == "Power") {
        if (baseData.heroName === undefined) {
          throw new Error(
            `Talent with GUID ${guid} was of type power, but has no associated hero name?`,
          );
        }
        await tx.power.upsert({
          where: {
            gameGuid: talent.GUID,
          },
          update: baseData,
          // @ts-expect-error Already checked for if heroName is undefined above
          create: baseData,
        });
        continue;
      }

      const existingItem = await tx.item.findUnique({
        where: {
          gameGuid: talent.GUID,
        },
        include: {
          statMods: {
            include: {
              stat: {
                select: CleanStatInclude,
              },
            },
          },
        },
      });

      if (existingItem) {
        // Update the existing item
        await tx.item.update({
          where: {
            id: existingItem.id,
          },
          data: {
            ...baseData,
            cost: talent.Cost,
            category: itemCategoryValueToEnum[talent.Category.Value],
            rarity: itemRarityValueToEnum[talent.Rarity.Value],
            removed: existingItem.removed,
            iconURL: existingItem.iconURL,
          },
        });

        for (const [i, buff] of talent.Buffs.entries()) {
          // Create the stat if it doesn't exist
          const stat = await tx.stat.upsert({
            where: {
              name: buff.Name,
            },
            update: {
              // Only preset stats defined in the overrides have descriptions
              description: buff.Description,
            },
            create: {
              statType: buff.StatType ?? "Custom",
              name: buff.Name,
              description: buff.Description, // Only preset stats defined in the overrides have descriptions
              iconURL: buff.OverrideIconName,
            },
          });

          const existingStatMod = existingItem.statMods.find(
            (sm) => sm.gameGuid != null && sm.gameGuid == buff.GameValueGUID,
          );
          if (buff.GameValueGUID) {
            processedStatMods.add(buff.GameValueGUID);
          }

          const statMod = {
            orderIndex: i,
            isShownPostDescription:
              existingStatMod?.isShownPostDescription ?? buff.ShowPostDescription ?? false,
            hidden: existingStatMod?.hidden ?? buff.Hidden ?? false,
            amount: buff.IsPercentage ? buff.Value * 100 : buff.Value,
            isPercentage: buff.IsPercentage,
            gameGuid: buff.GameValueGUID,
            Item: {
              connect: {
                id: existingItem.id,
              },
            },
            stat: {
              connect: {
                id: stat.id,
              },
            },
          };

          if (existingStatMod) {
            await tx.statMod.update({
              where: {
                id: existingStatMod.id,
              },
              data: statMod,
            });
            continue;
          } else {
            await tx.statMod.create({
              data: statMod,
            });
          }
        }
      } else {
        await tx.item.create({
          data: {
            ...baseData,
            cost: talent.Cost,
            category: itemCategoryValueToEnum[talent.Category.Value],
            rarity: itemRarityValueToEnum[talent.Rarity.Value],
            statMods: {
              create: talent.Buffs.map((buff, i) => {
                return {
                  orderIndex: i,
                  stat: {
                    connectOrCreate: {
                      where: {
                        name: buff.Name,
                      },
                      create: {
                        statType: buff.StatType ?? "Custom",
                        name: buff.Name,
                        // Only preset stats defined in the overrides have descriptions
                        description: buff.Description,
                        iconURL: buff.OverrideIconName,
                      },
                    },
                  },
                  isShownPostDescription: buff.ShowPostDescription ?? false,
                  hidden: buff.Hidden ?? false,
                  amount: buff.IsPercentage ? buff.Value * 100 : buff.Value,
                  isPercentage: buff.IsPercentage ?? false,
                  gameGuid: buff.GameValueGUID,
                };
              }),
            },
          },
        });
      }
    }

    // Remove stat mods that are not in the processed list and don't have a gameGuid
    // on first run on existing db, this will remove all stat mods as they will have been recreated with guids
    // but on subsequent runs, this should only remove custom stat mods that don't have a gameGuid
    const statModsToRemove = existingStatMods
      .filter((statMod) => {
        return !statMod.gameGuid || !processedStatMods.has(statMod.gameGuid);
      })
      .map((statMod) => statMod.id)
      .filter(Boolean) as string[];

    if (statModsToRemove.length > 0) {
      console.log("Removing", statModsToRemove.length, "stat mods");
      console.log("Stat mods to remove", statModsToRemove);
      await tx.statMod.deleteMany({
        where: {
          id: {
            in: statModsToRemove,
          },
        },
      });
    }
  });
}

function applyCustomTalentOverrideData(talent: Talent, overrideData?: CustomTalent) {
  if (!overrideData) {
    return;
  }

  if (overrideData.NameOverride) {
    talent.Name = overrideData.NameOverride;
  }
  if (overrideData.Description) {
    talent.Description = overrideData.Description;
  }
  if (overrideData.DescriptionFormatted) {
    talent.DescriptionFormatted = overrideData.DescriptionFormatted;
  }
  if (overrideData.Cost) {
    talent.Cost = overrideData.Cost;
  }
  if (overrideData.Rarity) {
    talent.Rarity = overrideData.Rarity;
  }
  if (overrideData.Category) {
    talent.Category = overrideData.Category;
  }

  if (overrideData.Buffs) {
    talent.Buffs = [...talent.Buffs, ...overrideData.Buffs];
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
