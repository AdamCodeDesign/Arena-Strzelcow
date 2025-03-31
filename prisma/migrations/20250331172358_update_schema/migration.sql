-- DropForeignKey
ALTER TABLE "Gun" DROP CONSTRAINT "Gun_compensatorId_fkey";

-- DropForeignKey
ALTER TABLE "Gun" DROP CONSTRAINT "Gun_silencerId_fkey";

-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "gunId" INTEGER;

-- AlterTable
ALTER TABLE "Gun" ALTER COLUMN "compensatorId" DROP NOT NULL,
ALTER COLUMN "silencerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES "Gun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_silencerId_fkey" FOREIGN KEY ("silencerId") REFERENCES "Silencer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_compensatorId_fkey" FOREIGN KEY ("compensatorId") REFERENCES "Compensator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
