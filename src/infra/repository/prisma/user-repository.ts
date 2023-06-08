import {
    Username,
    User,
    EmailAddress,
    UserID,
    Email,
    PasswordHash,
    EmailID,
    EmailValidationCode,
} from "@domain/model/users";
import { UserRepository, UserRepositoryError } from "@domain/repository/users";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryPrisma implements UserRepository {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async findByUsername(username: Username): Promise<User | null> {
        try {
            let userData = await this.prismaClient.user.findUnique({
                include: { email: true },
                where: {
                    username: username.value,
                },
            });

            if (userData == null) return null;

            return new User({
                id: new UserID(userData.id),
                username: new Username(userData.username),
                passwordHash: new PasswordHash(userData.passwordHash),
                email: new Email({
                    id: new EmailID(userData.email.id),
                    address: new EmailAddress(userData.email.address),
                    code:
                        userData.email.code == null
                            ? null
                            : new EmailValidationCode(userData.email.code),
                    validated: userData.email.validated,
                }),
            });
        } catch (e) {
            throw new UserRepositoryError();
        }
    }

    async create(user: User): Promise<void> {
        try {
            await this.prismaClient.user.create({
                include: {
                    email: true,
                },
                data: {
                    id: user.id.value,
                    username: user.username.value,
                    passwordHash: user.passwordHash.value,
                    email: {
                        create: {
                            id: user.email.id.value,
                            address: user.email.address.value,
                            code: user.email.code?.value,
                            validated: user.email.validated,
                        },
                    },
                },
            });
        } catch (e) {
            throw new UserRepositoryError();
        }
    }

    async hasUserWithEmailAddress(address: EmailAddress): Promise<boolean> {
        try {
            let n = await this.prismaClient.email.count({
                where: {
                    address: address.value,
                },
            });

            return n > 0;
        } catch (e) {
            throw new UserRepositoryError();
        }
    }
    async hasUserWithUsername(username: Username): Promise<boolean> {
        try {
            let n = await this.prismaClient.user.count({
                where: {
                    username: username.value,
                },
            });

            return n > 0;
        } catch (e) {
            throw new UserRepositoryError();
        }
    }
}
