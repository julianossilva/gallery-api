import crypto from "node:crypto";
import { cleanDatabase } from "@main/clean-database";
import { SessionServicePrisma } from "./session-service-prisma";
import { PrismaClient } from "@prisma/client";
import { UserID } from "@domain/model/users";
import 'dotenv/config'

let prismaClient: PrismaClient;
let sessionService: SessionServicePrisma;
beforeEach(async () => {
    await cleanDatabase();

    prismaClient = new PrismaClient();
    sessionService = new SessionServicePrisma(prismaClient, "shhh");
});

test("should create a session and retrieve", async () => {
    let userID = crypto.randomUUID();

    let session = await sessionService.create(new UserID(userID));
    let token = session.getToken();

    let retrievedSession = await sessionService.find(token);

    expect(session.getId()).toBe(retrievedSession?.getId());
    expect(session.getCurrentUserID().value).toBe(
        retrievedSession?.getCurrentUserID().value
    );
    expect(session.getExpiration().toMilliseconds()).toBe(
        retrievedSession?.getExpiration().toMilliseconds()
    );
    expect(session.getToken()).toBe(retrievedSession?.getToken());
});
