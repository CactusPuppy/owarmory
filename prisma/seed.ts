import { promises } from "node:fs";
import { z } from "zod";
import { PrismaClient } from "../src/generated/prisma";
import { ItemRarity, ItemCategory } from "../src/lib/types/build";
import { heroes } from "../src/lib/constants/heroData";
import { StatNames } from "../src/lib/constants/stats";
const { readFile } = promises;

type PrismaTransaction = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

const prisma = new PrismaClient();

const GuidValue = z.object({
  GUID: z.string(),
  Value: z.string(),
});

const Buff = z.object({
  GameValueGUID: z.string(),
  IconGUID: z.string(),
  Name: z.string(),
  Description: z.string(),
  DescriptionFormatted: z.string(),
  FormattedText: z.string(),
  Value: z.number(),
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
    Buffs: z.array(Buff),
    GameValues: z.array(z.any()),
  }),
);

async function createStats(tx: PrismaTransaction) {
  return await tx.stat.createManyAndReturn({
    data: StatNames.map((statName) => ({
      name: statName,
      iconURL: `/images/stats/${encodeURIComponent(statName)}.webp`,
    })),
  });
}

async function createHeroes(tx: PrismaTransaction) {
  return await tx.hero.createManyAndReturn({
    data: heroes.map((heroData) => ({
      name: heroData.name as string,
      role: heroData.role as string,
    })),
  });
}

async function main() {
  console.log("Beginning seed transaction...");
  prisma.$transaction(async (tx) => {
    console.log("Creating heroes...");
    const heroes = await createHeroes(tx);

    console.log("Creating stats...");
    const stats = await createStats(tx);

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
        description: talent.DescriptionFormatted ?? talent.Description,
        iconURL: `/images/talents/${encodeURIComponent(talent.Name)}.png`,
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
            create: talent.Buffs.map((buff) => {
              const stat = stats.filter((stat) => stat.name === buff.Name)![0].id;
              return {
                statId: stat,
                amount: buff.Value < 1 ? buff.Value * 100 : buff.Value,
                isPercentage: buff.Value < 1,
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
