import { promises } from "node:fs";
import { z } from "zod";
import { PrismaClient } from "../src/generated/prisma";
import { ItemRarity, ItemCategory } from "../src/lib/types/build";
import { heroes } from "../src/lib/constants/heroData";
import { CustomStats } from "../src/lib/constants/stats";
const { readFile } = promises;

type PrismaTransaction = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

const prisma = new PrismaClient();

const GuidValue = z.object({
  GUID: z.string(),
  Value: z.string(),
});

const Buff = z.object({
  GameValueGUID: z.string(),
  IconGUID: z.string().optional(),
  Name: z.string(),
  Description: z.string(),
  DescriptionFormatted: z.string(),
  ShowPostDescription: z.boolean().optional(),
  Hidden: z.boolean().optional(),
  FormattedText: z.string(),
  Value: z.number(),
  IsPercentage: z.boolean().optional(),
});

const CustomBuff = z.object({
  StatType: z.literal("Custom"),
  Name: z.string(),
  Amount: z.number(),
  IsPercentage: z.boolean().optional(),
  ShowPostDescription: z.boolean().optional(),
  Hidden: z.boolean().optional(),
});

const StadiumDataSchema = z.record(
  z.string(),
  z.object({
    GUID: z.string(),
    Name: z.string(),
    Description: z.string(),
    DescriptionFormatted: z.string().nullable(),
    Cost: z.number().nonnegative(),
    Hero: GuidValue.nullable(),
    Rarity: GuidValue,
    Category: GuidValue,
    Buffs: z.array(z.union([Buff, CustomBuff])),
    GameValues: z.array(z.any()),
  }),
);

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

    for (const [index, [guid, talent]] of Object.entries(stadiumData).entries()) {
      console.log(
        `Processing talent ${guid} (${index + 1} / ${Object.values(stadiumData).length})`,
      );

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
        await tx.power.upsert({
          where: {
            gameGuid: talent.GUID,
          },
          update: baseData,
          create: baseData,
        });
        continue;
      }

      // Replace the simple create with a upsert pattern that handles statMods
      const existingItem = await tx.item.findUnique({
        where: {
          gameGuid: talent.GUID,
        },
        include: {
          statMods: {
            include: {
              stat: true,
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

        if (existingItem.statMods.length > 0) {
          await tx.statMod.deleteMany({
            where: {
              Item: {
                every: {
                  id: existingItem.id,
                },
              },
            },
          });
        }

        for (let i = 0; i < talent.Buffs.length; i++) {
          const buff = talent.Buffs[i];

          let customStat;
          if ("StatType" in buff) {
            customStat = CustomStats.find((stat) => stat.Name == buff.Name);
          }

          const stat = await tx.stat.upsert({
            where: {
              name: buff.Name,
            },
            update: {
              // custom stats don't really need descriptions
              //description: buff.DescriptionFormatted
            },
            create: {
              statType: "Custom",
              name: buff.Name,
              iconURL: customStat?.OverrideIconName
                ? `/images/stats/${encodeURIComponent(customStat.OverrideIconName)}.webp`
                : null,
            },
          });

          const existingStatMod = existingItem.statMods.find((sm) => sm.stat.name === buff.Name);

          let buffValue;
          if ("StatType" in buff) {
            buffValue = buff.Amount;
          } else {
            buffValue = buff.Value;
          }

          await tx.statMod.create({
            data: {
              orderIndex: i,
              isShownPostDescription: existingStatMod?.isShownPostDescription ?? false,
              hidden: existingStatMod?.hidden ?? false,
              amount: buff.IsPercentage ? buffValue * 100 : buffValue,
              isPercentage: buff.IsPercentage,
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
            },
          });
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
                if ("StatType" in buff) {
                  // Custom stat, not really needed anymore?
                  const customStat = CustomStats.find((stat) => stat.Name == buff.Name);
                  return {
                    orderIndex: i,
                    stat: {
                      connectOrCreate: {
                        where: {
                          name: buff.Name,
                        },
                        create: {
                          statType: "Custom",
                          name: buff.Name,
                          iconURL: customStat?.OverrideIconName
                            ? `/images/stats/${encodeURIComponent(customStat.OverrideIconName)}.webp`
                            : null,
                        },
                      },
                    },
                    isShownPostDescription: buff.ShowPostDescription,
                    hidden: buff.Hidden,
                    amount: buff.IsPercentage ? buff.Amount * 100 : buff.Amount,
                    isPercentage: buff.IsPercentage,
                  };
                }

                return {
                  orderIndex: i,
                  stat: {
                    connectOrCreate: {
                      where: {
                        name: buff.Name,
                      },
                      create: {
                        statType: "Custom",
                        name: buff.Name,

                        // Only the 'main' stats have these which likely already exist so any new stats are likely 'custom' and don't need this
                        //description: buff.DescriptionFormatted,
                        //iconURL: `/images/stats/${encodeURIComponent(buff.Name)}.webp`,
                      },
                    },
                  },
                  isShownPostDescription: buff.ShowPostDescription ?? false,
                  hidden: buff.Hidden ?? false,
                  amount: buff.IsPercentage ? buff.Value * 100 : buff.Value,
                  isPercentage: buff.IsPercentage ?? false,
                };
              }),
            },
          },
        });
      }
    }
  });
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
