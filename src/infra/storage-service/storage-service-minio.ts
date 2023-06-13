import { Client } from "minio";
import { StorageService } from "@application/storage-service";

export class StorageServiceMinio implements StorageService {
    private minioClient: Client;
    private bucketName: string;

    constructor(minioClient: Client, bucketName: string) {
        this.minioClient = minioClient;
        this.bucketName = bucketName;
    }

    async store(path: string, name: string): Promise<void> {
        await this.minioClient.fPutObject(
            this.bucketName, // bucket name
            name, //objectName
            path //filePath
        );
    }
}
