-- CreateTable
CREATE TABLE "Wallpaper" (
    "id" UUID NOT NULL,
    "owner" UUID NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Wallpaper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallpaper_username_key" ON "Wallpaper"("username");
