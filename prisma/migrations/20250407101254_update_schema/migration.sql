/*
  Warnings:

  - You are about to drop the column `name` on the `Club` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clubName]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clubName` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "name",
ADD COLUMN     "clubName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Club_clubName_key" ON "Club"("clubName");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
