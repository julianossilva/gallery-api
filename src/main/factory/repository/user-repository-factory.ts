import { UserRepository } from "@domain/repository/users";
import { UserRepositoryPrisma } from "@infra/repository/prisma/user-repository";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryFactory {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    create(): UserRepository {
        return new UserRepositoryPrisma(this.prismaClient);
    }
}
