/*
  Warnings:

  - You are about to drop the column `username` on the `Wallpaper` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Wallpaper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Wallpaper` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Wallpaper_username_key";

-- AlterTable
ALTER TABLE "Wallpaper" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallpaper_name_key" ON "Wallpaper"("name");
