/*
  Warnings:

  - You are about to drop the column `powerId` on the `RoundInfo` table. All the data in the column will be lost.
  - You are about to drop the `_ItemToRoundInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoundInfo" DROP CONSTRAINT "RoundInfo_powerId_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToRoundInfo" DROP CONSTRAINT "_ItemToRoundInfo_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToRoundInfo" DROP CONSTRAINT "_ItemToRoundInfo_B_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "removed" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RoundInfo" DROP COLUMN "powerId";

-- DropTable
DROP TABLE "_ItemToRoundInfo";

-- CreateTable
CREATE TABLE "RoundInfoSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "parentRoundInfoId" TEXT NOT NULL,
    "powerId" TEXT,

    CONSTRAINT "RoundInfoSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToRoundInfoSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemToRoundInfoSection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToRoundInfoSection_B_index" ON "_ItemToRoundInfoSection"("B");

-- AddForeignKey
ALTER TABLE "RoundInfoSection" ADD CONSTRAINT "RoundInfoSection_parentRoundInfoId_fkey" FOREIGN KEY ("parentRoundInfoId") REFERENCES "RoundInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundInfoSection" ADD CONSTRAINT "RoundInfoSection_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToRoundInfoSection" ADD CONSTRAINT "_ItemToRoundInfoSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToRoundInfoSection" ADD CONSTRAINT "_ItemToRoundInfoSection_B_fkey" FOREIGN KEY ("B") REFERENCES "RoundInfoSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
