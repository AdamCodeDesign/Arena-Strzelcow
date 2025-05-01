/*
  Warnings:

  - You are about to drop the column `clubId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clubId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "clubId" INTEGER,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clubId";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
