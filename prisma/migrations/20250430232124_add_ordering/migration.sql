-- AlterTable
ALTER TABLE "RoundInfo" ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RoundInfoSection" ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "StatMod" ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0;
