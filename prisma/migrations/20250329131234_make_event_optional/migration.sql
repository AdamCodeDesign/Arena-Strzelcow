-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_eventId_fkey";

-- AlterTable
ALTER TABLE "Competition" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
