import { Wallpaper } from "@domain/model/wallpapers";
import { WallpaperRepository } from "@domain/repository/wallpapers";
import { PrismaClient } from "@prisma/client";

export class WallpaperRepositoryPrisma implements WallpaperRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async create(wallpaper: Wallpaper): Promise<void> {
        this.prismaClient.wallpaper.create({
            data: {
                id: wallpaper.id.value,
                name: wallpaper.name.value,
                owner: wallpaper.owner.value,
            },
        });
    }
}
