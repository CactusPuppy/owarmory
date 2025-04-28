/*
  Warnings:

  - Changed the type of `category` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ItemRarity" AS ENUM ('Common', 'Rare', 'Epic');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "rarity" "ItemRarity" NOT NULL DEFAULT 'Common',
DROP COLUMN "category",
ADD COLUMN     "category" "ItemCategory" NOT NULL;
