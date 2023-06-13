import { Wallpaper } from "@domain/model/wallpaper";
export interface WallpaperRepository {
    create(wallpaper: Wallpaper): Promise<void>;
}
