import { StorageService } from "@application/storage-service";
import { StorageServiceMinio } from "@infra/storage-service/storage-service-minio";
import { Client } from "minio";

export class StorageServiceFactory {
    constructor(private minioClient: Client, private bucket: string) {}

    create(): StorageService {
        return new StorageServiceMinio(this.minioClient, this.bucket);
    }
}
