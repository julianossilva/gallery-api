import { UploadService, UploadServiceImpl } from "@application/upload-service";
import { WallpaperRepositoryFactory } from "../repository/wallpaper-repository-factory";
import { SessionServiceFactory } from "./session-service-factory";
import { StorageServiceFactory } from "./storage-service-factory";

export class UploadServiceFactory {
    constructor(
        private sessionServiceFactory: SessionServiceFactory,
        private storageServiceFactory: StorageServiceFactory,
        private wallpaperRepositoryFactory: WallpaperRepositoryFactory,
    ) {}
    create(): UploadService {
        return new UploadServiceImpl(
            this.sessionServiceFactory.create(),
            this.storageServiceFactory.create(),
            this.wallpaperRepositoryFactory.create(),
        );
    }
}
