/*
  Warnings:

  - You are about to drop the column `gunId` on the `Compensator` table. All the data in the column will be lost.
  - You are about to drop the column `gunId` on the `Magazine` table. All the data in the column will be lost.
  - You are about to drop the column `gunId` on the `Silencer` table. All the data in the column will be lost.
  - Added the required column `compensatorId` to the `Gun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magazineId` to the `Gun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `silencerId` to the `Gun` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Compensator" DROP CONSTRAINT "Compensator_gunId_fkey";

-- DropForeignKey
ALTER TABLE "Magazine" DROP CONSTRAINT "Magazine_gunId_fkey";

-- DropForeignKey
ALTER TABLE "Silencer" DROP CONSTRAINT "Silencer_gunId_fkey";

-- AlterTable
ALTER TABLE "Compensator" DROP COLUMN "gunId";

-- AlterTable
ALTER TABLE "Gun" ADD COLUMN     "compensatorId" INTEGER NOT NULL,
ADD COLUMN     "magazineId" INTEGER NOT NULL,
ADD COLUMN     "silencerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Magazine" DROP COLUMN "gunId";

-- AlterTable
ALTER TABLE "Silencer" DROP COLUMN "gunId";

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_silencerId_fkey" FOREIGN KEY ("silencerId") REFERENCES "Silencer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_magazineId_fkey" FOREIGN KEY ("magazineId") REFERENCES "Magazine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_compensatorId_fkey" FOREIGN KEY ("compensatorId") REFERENCES "Compensator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
