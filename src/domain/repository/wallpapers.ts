import { Wallpaper } from "@domain/model/wallpapers";

export interface WallpaperRepository {
    create(wallpaper: Wallpaper): Promise<void>;
}
