-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BANNED', 'USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
