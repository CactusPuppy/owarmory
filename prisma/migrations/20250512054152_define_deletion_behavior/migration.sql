/*
  Warnings:

  - Made the column `removed` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_heroName_fkey";

-- DropForeignKey
ALTER TABLE "Power" DROP CONSTRAINT "Power_heroName_fkey";

-- DropForeignKey
ALTER TABLE "RoundInfo" DROP CONSTRAINT "RoundInfo_buildId_fkey";

-- DropForeignKey
ALTER TABLE "RoundInfoSection" DROP CONSTRAINT "RoundInfoSection_parentRoundInfoId_fkey";

-- DropForeignKey
ALTER TABLE "StatMod" DROP CONSTRAINT "StatMod_statId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "removed" SET NOT NULL,
ALTER COLUMN "rarity" SET DEFAULT 'Common';

-- AddForeignKey
ALTER TABLE "RoundInfo" ADD CONSTRAINT "RoundInfo_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "StadiumBuild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundInfoSection" ADD CONSTRAINT "RoundInfoSection_parentRoundInfoId_fkey" FOREIGN KEY ("parentRoundInfoId") REFERENCES "RoundInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_heroName_fkey" FOREIGN KEY ("heroName") REFERENCES "Hero"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_heroName_fkey" FOREIGN KEY ("heroName") REFERENCES "Hero"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatMod" ADD CONSTRAINT "StatMod_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
