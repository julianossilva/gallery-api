import express from "express";
import authRoutes from "@main/routes/auth";
import { AuthService, AuthServiceImpl } from "@application/auth-service";
import { UserRepository } from "@domain/repository/users";
import { UserRepositoryPrisma } from "@infra/repository/prisma/user-repository";
import { PrismaClient } from "@prisma/client";
import {SessionService} from "@application/session-service";
import {SessionServicePrisma, SessionStorage} from "@infra/session/prisma/session-service-prisma";

async function main() {
    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    let prismaClient = new PrismaClient();

    let userRepository: UserRepository = new UserRepositoryPrisma(prismaClient);

    let sessionStorage = new SessionStorage(prismaClient);
    let sessionService: SessionService = new SessionServicePrisma(sessionStorage)

    let authService: AuthService = new AuthServiceImpl(userRepository, sessionService);

    app.use(authRoutes(authService));
}

main();
