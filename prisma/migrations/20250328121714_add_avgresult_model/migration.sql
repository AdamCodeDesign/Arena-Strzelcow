-- CreateTable
CREATE TABLE "AvgResult" (
    "id" SERIAL NOT NULL,
    "averageScore" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvgResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AvgResult" ADD CONSTRAINT "AvgResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvgResult" ADD CONSTRAINT "AvgResult_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
