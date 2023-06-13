import { PrismaClient } from "@prisma/client";
import { WallpaperRepository } from "@domain/repository/wallpapers";
import { WallpaperRepositoryPrisma } from "@infra/repository/prisma/wallpaper-repository";
export class WallpaperRepositoryFactory {
    constructor(private prismaClient: PrismaClient) {}

    create(): WallpaperRepository {
        return new WallpaperRepositoryPrisma(this.prismaClient);
    }
}
