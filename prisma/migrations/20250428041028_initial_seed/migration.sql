/*
  Warnings:

  - You are about to drop the column `hero` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `hero` on the `StadiumBuild` table. All the data in the column will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroName` to the `StadiumBuild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statId` to the `StatMod` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('Weapon', 'Ability', 'Survival');

-- CreateEnum
CREATE TYPE "HeroRole" AS ENUM ('Tank', 'Damage', 'Support');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "hero",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "heroName" TEXT,
ADD COLUMN     "iconURL" TEXT,
ADD COLUMN     "removed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "iconURL" TEXT,
ADD COLUMN     "removed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "StadiumBuild" DROP COLUMN "hero",
ADD COLUMN     "heroName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StatMod" ADD COLUMN     "isPercentage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "statId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Hero";

-- CreateTable
CREATE TABLE "Hero" (
    "name" TEXT NOT NULL,
    "role" "HeroRole" NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "StadiumBuild" ADD CONSTRAINT "StadiumBuild_heroName_fkey" FOREIGN KEY ("heroName") REFERENCES "Hero"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_heroName_fkey" FOREIGN KEY ("heroName") REFERENCES "Hero"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatMod" ADD CONSTRAINT "StatMod_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
