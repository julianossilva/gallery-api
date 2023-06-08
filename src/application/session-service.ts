import { UserID } from "@domain/model/users";
import { DateTime } from "@utils/datetime";

export class SessionError extends Error {}

export interface Session {
    getId(): string;
    getCurrentUserID(): UserID;
    getToken(): string;
    getExpiration(): DateTime;
}

export interface SessionService {
    create(userID: UserID): Promise<Session>;
    find(token: string): Promise<Session|null>;
    delete(session: Session): Promise<void>;
}
