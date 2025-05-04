/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Stat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Stat" ADD COLUMN     "description" TEXT,
ADD COLUMN     "statType" TEXT NOT NULL DEFAULT 'Preset';

-- AlterTable
ALTER TABLE "StatMod" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isShownPostDescription" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Stat_name_key" ON "Stat"("name");
