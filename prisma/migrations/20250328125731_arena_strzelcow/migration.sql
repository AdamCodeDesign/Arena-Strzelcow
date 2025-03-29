/*
  Warnings:

  - Added the required column `distance` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "distance" INTEGER NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "scope" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Scope" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "magnification" DOUBLE PRECISION,
    "lensDiameter" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GunScopes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GunScopes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GunScopes_B_index" ON "_GunScopes"("B");

-- AddForeignKey
ALTER TABLE "_GunScopes" ADD CONSTRAINT "_GunScopes_A_fkey" FOREIGN KEY ("A") REFERENCES "Gun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GunScopes" ADD CONSTRAINT "_GunScopes_B_fkey" FOREIGN KEY ("B") REFERENCES "Scope"("id") ON DELETE CASCADE ON UPDATE CASCADE;
