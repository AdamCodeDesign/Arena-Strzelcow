-- DropForeignKey
ALTER TABLE "Grip" DROP CONSTRAINT "Grip_gunId_fkey";

-- AlterTable
ALTER TABLE "Grip" ALTER COLUMN "gunId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Grip" ADD CONSTRAINT "Grip_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES "Gun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
