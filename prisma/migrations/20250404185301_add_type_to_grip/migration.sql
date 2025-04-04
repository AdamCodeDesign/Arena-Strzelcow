/*
  Warnings:

  - Added the required column `type` to the `Grip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grip" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;
