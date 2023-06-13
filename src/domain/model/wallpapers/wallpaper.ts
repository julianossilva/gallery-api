import { UserID } from "@domain/model/users";
import { WallpaperID } from "./wallpaper-id";
import { WallpaperName } from "./wallpaper-name";

export class Wallpaper {
    public id: WallpaperID;
    public name: WallpaperName;
    public owner: UserID;

    constructor(id: WallpaperID, name: WallpaperName, owner: UserID) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }
}
