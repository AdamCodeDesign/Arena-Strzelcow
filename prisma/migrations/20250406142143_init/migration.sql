-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eventId" INTEGER,
    "type" TEXT NOT NULL,
    "gunId" INTEGER,
    "distance" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "scope" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipants" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionParticipants" (
    "id" SERIAL NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gun" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "caliber" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "silencerId" INTEGER,
    "magazineId" INTEGER,
    "compensatorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scope" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "magnification" DOUBLE PRECISION,
    "lensDiameter" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "weight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Silencer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "length" INTEGER,
    "weight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Silencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compensator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "material" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Compensator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "material" TEXT,
    "weight" INTEGER,
    "gunId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Magazine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "material" TEXT NOT NULL,
    "weight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Magazine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "gunId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CompetitionParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CompetitionParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_GunScopes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GunScopes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_EventParticipants_B_index" ON "_EventParticipants"("B");

-- CreateIndex
CREATE INDEX "_CompetitionParticipants_B_index" ON "_CompetitionParticipants"("B");

-- CreateIndex
CREATE INDEX "_GunScopes_B_index" ON "_GunScopes"("B");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES "Gun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionParticipants" ADD CONSTRAINT "CompetitionParticipants_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionParticipants" ADD CONSTRAINT "CompetitionParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_silencerId_fkey" FOREIGN KEY ("silencerId") REFERENCES "Silencer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_magazineId_fkey" FOREIGN KEY ("magazineId") REFERENCES "Magazine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gun" ADD CONSTRAINT "Gun_compensatorId_fkey" FOREIGN KEY ("compensatorId") REFERENCES "Compensator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grip" ADD CONSTRAINT "Grip_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES "Gun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES "Gun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventParticipants" ADD CONSTRAINT "_EventParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventParticipants" ADD CONSTRAINT "_EventParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionParticipants" ADD CONSTRAINT "_CompetitionParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompetitionParticipants" ADD CONSTRAINT "_CompetitionParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GunScopes" ADD CONSTRAINT "_GunScopes_A_fkey" FOREIGN KEY ("A") REFERENCES "Gun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GunScopes" ADD CONSTRAINT "_GunScopes_B_fkey" FOREIGN KEY ("B") REFERENCES "Scope"("id") ON DELETE CASCADE ON UPDATE CASCADE;
