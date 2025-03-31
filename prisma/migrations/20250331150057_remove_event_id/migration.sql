/*
  Warnings:

  - You are about to drop the column `eventId` on the `AvgResult` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AvgResult" DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "eventId";
