import { StorageService } from "@application/storage-service";
import { SessionService } from "@application/session-service";
import { DateTime } from "@utils/datetime";
import crypto from "node:crypto";
import { WallpaperRepository } from "@domain/repository/wallpapers";
import {
    Wallpaper,
    WallpaperID,
    WallpaperName,
} from "@domain/model/wallpapers";
import { PublicInterface } from "@utils/types";
import { UserID } from "@domain/model/users";

export class UnauthenticatedUserError extends Error {}
export class InvalidMimeTypeError extends Error {}

export class UploadServiceImpl {
    private storageService: StorageService;
    private sessionService: SessionService;
    private wallapaperRepository: WallpaperRepository;

    constructor(
        sessionService: SessionService,
        storageService: StorageService,
        wallpaperRepository: WallpaperRepository,
    ) {
        this.storageService = storageService;
        this.sessionService = sessionService;
        this.wallapaperRepository = wallpaperRepository;
    }

    async upload(token: string, path: string): Promise<string> {
        let session = await this.sessionService.find(token);
        if (session == null) throw new UnauthenticatedUserError();

        let now = new DateTime();
        let name = `${session.getId()}-${now.toMilliseconds()}-${randomName()}.png`;

        await this.storageService.store(path, name);

        let wallpaper = new Wallpaper(
            new WallpaperID(crypto.randomUUID()),
            new WallpaperName(name),
            new UserID(session.getId())
        );

        await this.wallapaperRepository.create(wallpaper);

        return name;
    }
}

export type UploadService = PublicInterface<UploadServiceImpl>;

function randomName(): string {
    return crypto.randomBytes(20).toString("base64url");
}
