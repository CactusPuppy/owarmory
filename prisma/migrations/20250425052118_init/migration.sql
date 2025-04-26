-- CreateEnum
CREATE TYPE "Hero" AS ENUM ('DVa', 'Doomfist', 'Hazard', 'Junker_Queen', 'Mauga', 'Orisa', 'Ramattra', 'Reinhardt', 'Roadhog', 'Sigma', 'Winston', 'Wrecking_Ball', 'Zarya', 'Ashe', 'Bastion', 'Cassidy', 'Echo', 'Freja', 'Genji', 'Hanzo', 'Junkrat', 'Mei', 'Pharah', 'Reaper', 'Soldier_76', 'Sojourn', 'Sombra', 'Symmetra', 'Torbjörn', 'Tracer', 'Venture', 'Widowmaker', 'Ana', 'Baptiste', 'Brigitte', 'Illari', 'Juno', 'Kiriko', 'Lifeweaver', 'Lúcio', 'Mercy', 'Moira', 'Zenyatta');

-- CreateTable
CREATE TABLE "StadiumBuild" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buildTitle" VARCHAR(63) NOT NULL,
    "description" TEXT,
    "additionalNotes" TEXT,
    "hero" "Hero" NOT NULL,

    CONSTRAINT "StadiumBuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoundInfo" (
    "id" TEXT NOT NULL,
    "buildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "powerId" TEXT,

    CONSTRAINT "RoundInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cost" INTEGER NOT NULL,
    "hero" "Hero",

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Power" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iconURL" TEXT,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatMod" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "StatMod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToStatMod" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemToStatMod_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ItemToRoundInfo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemToRoundInfo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToStatMod_B_index" ON "_ItemToStatMod"("B");

-- CreateIndex
CREATE INDEX "_ItemToRoundInfo_B_index" ON "_ItemToRoundInfo"("B");

-- AddForeignKey
ALTER TABLE "RoundInfo" ADD CONSTRAINT "RoundInfo_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "StadiumBuild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoundInfo" ADD CONSTRAINT "RoundInfo_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToStatMod" ADD CONSTRAINT "_ItemToStatMod_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToStatMod" ADD CONSTRAINT "_ItemToStatMod_B_fkey" FOREIGN KEY ("B") REFERENCES "StatMod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToRoundInfo" ADD CONSTRAINT "_ItemToRoundInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToRoundInfo" ADD CONSTRAINT "_ItemToRoundInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "RoundInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
