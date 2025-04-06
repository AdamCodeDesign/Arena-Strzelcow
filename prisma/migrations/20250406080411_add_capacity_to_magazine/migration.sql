/*
  Warnings:

  - Added the required column `capacity` to the `Magazine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Magazine" ADD COLUMN     "capacity" INTEGER NOT NULL;
