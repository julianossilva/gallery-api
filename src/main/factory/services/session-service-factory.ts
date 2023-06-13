import { SessionService } from "@application/session-service";
import { SessionServicePrisma } from "@infra/session/prisma/session-service-prisma";
import { PrismaClient } from "@prisma/client";

export class SessionServiceFactory {
    private prismaClient: PrismaClient;
    private appSecret: string;
    constructor(prismaClient: PrismaClient, appSecret: string) {
        this.prismaClient = prismaClient;
        this.appSecret = appSecret;
    }

    create(): SessionService {
        return new SessionServicePrisma(this.prismaClient, this.appSecret);
    }
}
