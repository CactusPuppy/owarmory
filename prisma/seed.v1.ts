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
        gameGuid: talent.GUID,
        name: talent.Name,
        description: talent.DescriptionFormatted ?? talent.Description,
        iconURL: `/images/talents/${talent.Name.trim()}.png`,
        heroName: talent.Hero
          ? heroes.filter((hero) => hero.name === talent.Hero!.Value)![0].name
          : undefined,
      };

      if (talent.Category.Value == "Power") {
        await tx.power.create({
          // @ts-expect-error Some items do not belong to heroes, but all powers do
          data: baseData,
        });
        continue;
      }

      await tx.item.create({
        data: {
          ...baseData,
          cost: talent.Cost,
          category: itemCategoryValueToEnum[talent.Category.Value],
          rarity: itemRarityValueToEnum[talent.Rarity.Value],
          statMods: {
            create: talent.Buffs.map((buff, i) => {
              if ("StatType" in buff) {
                // Custom stat
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
                      statType: "Preset",
                      name: buff.Name,
                      description: buff.DescriptionFormatted,
                      iconURL: `/images/stats/${encodeURIComponent(buff.Name)}.webp`,
                    },
                  },
                },
                isShownPostDescription: buff.ShowPostDescription,
                hidden: buff.Hidden,
                amount: buff.IsPercentage ? buff.Value * 100 : buff.Value,
                isPercentage: buff.IsPercentage,
              };
            }),
          },
        },
      });
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
