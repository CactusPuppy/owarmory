/*
  Warnings:

  - The `rarity` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `role` on the `Hero` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `authorId` to the `StadiumBuild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "rarity",
ADD COLUMN     "rarity" TEXT NOT NULL DEFAULT 'common',
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StadiumBuild" ADD COLUMN     "authorId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "HeroRole";

-- DropEnum
DROP TYPE "ItemCategory";

-- DropEnum
DROP TYPE "ItemRarity";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "oauthId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StadiumBuild" ADD CONSTRAINT "StadiumBuild_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
