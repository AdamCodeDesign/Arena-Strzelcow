/*
  Warnings:

  - Added the required column `gunId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AvgResult" DROP CONSTRAINT "AvgResult_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_eventId_fkey";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "gunId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES "Gun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
