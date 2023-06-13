import { Client } from "minio";
import { StorageServiceMinio } from "./storage-service-minio";
import { cleanDatabase } from "@main/clean-database";
import crypto from "node:crypto";
import { cleanStorage } from "@main/clean-storage";
let minioClient: Client;
import 'dotenv/config'

const MINIO_HOST = process.env.MINIO_HOST ?? ""
const MINIO_BUCKET = process.env.MINIO_BUCKET ?? ""
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? "";
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? "";

beforeEach(async () => {
    await cleanDatabase();
    await cleanStorage()

    minioClient = new Client({
        endPoint: MINIO_HOST,
        port: 9000,
        useSSL: false,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
    });
});

test("should store a file", async () => {
    let storageService = new StorageServiceMinio(minioClient, MINIO_BUCKET);

    let name = crypto.randomUUID() + ".png";
    await expect(
        storageService.store("assets/solid-color-black.png", name)
    ).resolves.toBe(undefined);

    let res = await fetch(`http://${MINIO_HOST}:9000/${MINIO_BUCKET}/${name}`);

    expect(res.status).toBe(200);
});
