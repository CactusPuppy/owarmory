/*
  Warnings:

  - You are about to drop the `_ItemToRoundInfoSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToRoundInfoSection" DROP CONSTRAINT "_ItemToRoundInfoSection_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToRoundInfoSection" DROP CONSTRAINT "_ItemToRoundInfoSection_B_fkey";

-- DropTable
DROP TABLE "_ItemToRoundInfoSection";

-- CreateTable
CREATE TABLE "_ItemPurchases" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemPurchases_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ItemSales" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemSales_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemPurchases_B_index" ON "_ItemPurchases"("B");

-- CreateIndex
CREATE INDEX "_ItemSales_B_index" ON "_ItemSales"("B");

-- AddForeignKey
ALTER TABLE "_ItemPurchases" ADD CONSTRAINT "_ItemPurchases_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemPurchases" ADD CONSTRAINT "_ItemPurchases_B_fkey" FOREIGN KEY ("B") REFERENCES "RoundInfoSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemSales" ADD CONSTRAINT "_ItemSales_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemSales" ADD CONSTRAINT "_ItemSales_B_fkey" FOREIGN KEY ("B") REFERENCES "RoundInfoSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
