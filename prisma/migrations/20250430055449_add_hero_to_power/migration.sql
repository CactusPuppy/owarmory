/*
  Warnings:

  - Added the required column `heroName` to the `Power` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "heroName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StadiumBuild" ALTER COLUMN "buildTitle" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_heroName_fkey" FOREIGN KEY ("heroName") REFERENCES "Hero"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
