/*
  Warnings:

  - Added the required column `caliber` to the `Gun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gun" ADD COLUMN     "caliber" TEXT NOT NULL;
