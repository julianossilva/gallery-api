import { PrismaClient } from "@prisma/client";

export async function cleanDatabase() {
    let prismaClient = new PrismaClient();

    await prismaClient.user.deleteMany({});
    await prismaClient.email.deleteMany({});
    await prismaClient.session.deleteMany({});

    await prismaClient.$disconnect();
}
