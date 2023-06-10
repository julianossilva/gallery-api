/*
  Warnings:

  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unsignedToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unsignedToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_token_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "token",
ADD COLUMN     "unsignedToken" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_unsignedToken_key" ON "Session"("unsignedToken");
