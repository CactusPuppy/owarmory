/*
  Warnings:

  - A unique constraint covering the columns `[gameGuid]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gameGuid]` on the table `Power` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "gameGuid" TEXT;

-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "gameGuid" TEXT;

-- AlterTable
ALTER TABLE "StatMod" ADD COLUMN     "gameGuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Item_gameGuid_key" ON "Item"("gameGuid");

-- CreateIndex
CREATE UNIQUE INDEX "Power_gameGuid_key" ON "Power"("gameGuid");
