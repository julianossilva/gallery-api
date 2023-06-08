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
    token: string;
    expiration: DateTime;
};

export class SessionPrisma implements Session {
    private id: string;
    private userID: UserID;
    private token: string;
    private expiration: DateTime;

    constructor(args: SessionPrismaArgs) {
        this.id = args.id;
        this.userID = args.userID;
        this.token = args.token;
        this.expiration = args.expiration;
    }

    getId(): string {
        return this.id;
    }
    getCurrentUserID(): UserID {
        return this.userID;
    }
    getToken(): string {
        return this.token;
    }
    getExpiration(): DateTime {
        return this.expiration;
    }
}

export class SessionServicePrisma implements SessionService {
    private sessionStorage: SessionStorage;

    constructor(
        sessionStorage: SessionStorage
    ) {
        this.sessionStorage = sessionStorage;
    }

    async create(userID: UserID): Promise<Session> {
        try {
            let id = crypto.randomUUID();
            let token = generateToken();
            let expiration = new DateTime().add(30 * DAY);

            return new SessionPrisma({
                id,
                userID,
                token,
                expiration,
            });
        } catch (e) {
            throw new SessionError();
        }
    }

    async find(token: string): Promise<Session|null> {
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

function generateToken(): string {
    return crypto.randomBytes(100).toString("base64url");
}

export class SessionStorage {
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    async findByToken(token: string): Promise<Session | null> {
        let sessionData = await this.prismaClient.session.findUnique({
            where: { token: token },
        });

        if (sessionData == null) return null;

        return new SessionPrisma({
            id: sessionData.id,
            userID: new UserID(sessionData.userID),
            token: sessionData.token,
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
