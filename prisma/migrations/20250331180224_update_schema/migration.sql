-- DropForeignKey
ALTER TABLE "Gun" DROP CONSTRAINT "Gun_magazineId_fkey";

-- AlterTable
ALTER TABLE "Gun" ALTER COLUMN "magazineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_magazineId_fkey" FOREIGN KEY ("magazineId") REFERENCES "Magazine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
