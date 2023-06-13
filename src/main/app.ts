import express from "express";
import authRoutes from "@main/routes/auth";
import uploadRoutes from "@main/routes/upload";
import { HashServiceFactory } from "@main/factory/services/hash-service-factory";
import { UserRepositoryFactory } from "@main/factory/repository/user-repository-factory";
import { SessionServiceFactory } from "@main/factory/services/session-service-factory";
import { AuthServiceFactory } from "@main/factory/services/auth-service-factory";
import { PrismaClient } from "@prisma/client";
import { Client } from "minio";
import { UploadServiceFactory } from "./factory/services/upload-service-factory";
import { StorageServiceFactory } from "./factory/services/storage-service-factory";
import { WallpaperRepositoryFactory } from "./factory/repository/wallpaper-repository-factory";

type ShutdownFunction = () => Promise<void>;

export async function createApp(): Promise<
    [express.Application, ShutdownFunction]
> {
    const APP_SECRET = process.env.APP_SECRET ?? "";
    const MINIO_HOST = process.env.MINIO_HOST ?? ""
    const MINIO_BUCKET = process.env.MINIO_BUCKET ?? ""
    const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? "";
    const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? "";

    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    let prismaClient = new PrismaClient();
    let minioClient = new Client({
        endPoint: MINIO_HOST,
        port: 9000,
        useSSL: false,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
    });

    let hashServiceFactory = new HashServiceFactory();
    let userRepositoryFactory = new UserRepositoryFactory(prismaClient);
    let sessionServiceFactory = new SessionServiceFactory(
        prismaClient,
        APP_SECRET
    );

    let authServiceFactory = new AuthServiceFactory(
        userRepositoryFactory,
        sessionServiceFactory,
        hashServiceFactory
    );

    let wallapaperRepositoryFactory = new WallpaperRepositoryFactory(
        prismaClient
    );
    let storageServiceFactory = new StorageServiceFactory(minioClient, MINIO_BUCKET);
    let uploadServiceFactory = new UploadServiceFactory(
        sessionServiceFactory,
        storageServiceFactory,
        wallapaperRepositoryFactory,
    );

    app.use(authRoutes(authServiceFactory));
    app.use(uploadRoutes(uploadServiceFactory));

    let shutdown = async () => {
        await prismaClient.$disconnect();
    };

    return [app, shutdown];
}
