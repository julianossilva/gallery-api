import express from "express";
import authRoutes from "@main/routes/auth";
import { AuthService, AuthServiceImpl } from "@application/auth-service";
import { UserRepository } from "@domain/repository/users";
import { UserRepositoryPrisma } from "@infra/repository/prisma/user-repository";
import { PrismaClient } from "@prisma/client";
import { SessionService } from "@application/session-service";
import {
    SessionServicePrisma,
} from "@infra/session/prisma/session-service-prisma";
import { HashServiceBcrypt } from "@infra/hash-service/hash-service-bcrypt";
import { HashService } from "@application/hash-service";

type ShutdownFunction = () => Promise<void>;

export async function createApp(): Promise<
    [express.Application, ShutdownFunction]
> {
    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    let prismaClient = new PrismaClient();

    let hashService: HashService = new HashServiceBcrypt();
    let userRepository: UserRepository = new UserRepositoryPrisma(prismaClient);

    let sessionService: SessionService = new SessionServicePrisma(
        prismaClient,
        "shhh"
    );

    let authService: AuthService = new AuthServiceImpl(
        userRepository,
        sessionService,
        hashService
    );

    app.use(authRoutes(authService));

    let shutdown = async () => {
        await prismaClient.$disconnect();
    };

    return [app, shutdown];
}
