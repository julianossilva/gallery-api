import {
    Session,
    SessionError,
    SessionService,
} from "@application/session-service";
import { UserID } from "@domain/model/users";
import { PrismaClient } from "@prisma/client";
import { DateTime, DAY } from "@utils/datetime";
import crypto from "node:crypto";

export type SessionPrismaArgs = {
    id: string;
    userID: UserID;
    unsignedToken: string;
    tag: string;
    expiration: DateTime;
};

export class SessionPrisma implements Session {
    private id: string;
    private userID: UserID;
    private unsignedToken: string;
    private tag: string;
    private expiration: DateTime;

    constructor(args: SessionPrismaArgs) {
        this.id = args.id;
        this.userID = args.userID;
        this.unsignedToken = args.unsignedToken;
        this.tag = args.tag;
        this.expiration = args.expiration;
    }

    getId(): string {
        return this.id;
    }
    getCurrentUserID(): UserID {
        return this.userID;
    }
    getToken(): string {
        return `${this.unsignedToken}.${this.tag}`;
    }
    getExpiration(): DateTime {
        return this.expiration;
    }
}

export class SessionServicePrisma implements SessionService {
    private sessionStorage: SessionStorage;

    constructor(prismaClient: PrismaClient, appSecret: string) {
        this.sessionStorage = new SessionStorage(prismaClient, appSecret);
    }

    async create(userID: UserID): Promise<Session> {
        try {
            return await this.sessionStorage.create(userID);
        } catch (e) {
            throw new SessionError();
        }
    }

    async find(token: string): Promise<Session | null> {
        try {
            return await this.sessionStorage.findByToken(token);
        } catch (e) {
            throw new SessionError();
        }
    }

    async delete(session: Session): Promise<void> {
        try {
            await this.sessionStorage.delete(session);
        } catch (e) {
            throw new SessionError();
        }
    }
}

class SessionStorage {
    private prismaClient: PrismaClient;
    private appSecret: string;

    constructor(prismaClient: PrismaClient, appSecret: string) {
        this.prismaClient = prismaClient;
        this.appSecret = appSecret;
    }

    async create(userID: UserID): Promise<Session> {
        let id = crypto.randomUUID();
        let unsignedToken = generateToken();
        let expiration = new DateTime().add(30 * DAY);

        await this.prismaClient.session.create({
            data: {
                id,
                userID: userID.value,
                unsignedToken,
                expiration: expiration.toString(),
            },
        });

        return new SessionPrisma({
            id,
            userID,
            unsignedToken,
            tag: generateTag(unsignedToken, this.appSecret),
            expiration,
        });
    }

    async findByToken(token: string): Promise<Session | null> {
        let sessionData = await this.prismaClient.session.findUnique({
            where: { unsignedToken: getUnsignedPart(token) },
        });

        if (sessionData == null) return null;

        return new SessionPrisma({
            id: sessionData.id,
            userID: new UserID(sessionData.userID),
            unsignedToken: sessionData.unsignedToken,
            tag: generateTag(sessionData.unsignedToken, this.appSecret),
            expiration: DateTime.fromDate(sessionData.expiration),
        });
    }

    async delete(session: Session): Promise<void> {
        await this.prismaClient.session.delete({
            where: {
                id: session.getId(),
            },
        });
    }
}

function generateTag(token: string, secret: string): string {
    return crypto
        .createHmac("SHA256", secret)
        .update(token)
        .digest("base64url");
}

function getUnsignedPart(token: string): string {
    let parts = token.split(".");

    return parts[0] ?? "";
}

function generateToken(): string {
    return crypto.randomBytes(100).toString("base64url");
}
