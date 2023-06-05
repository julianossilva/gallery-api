import { UserID } from "@domain/model/users";

export interface Session {
    getCurrentUserID(): UserID;
    getToken(): string;
}

export interface SessionService {
    create(userID: UserID): Promise<Session>;
    find(token: string): Promise<Session>;
    delete(session: Session): Promise<void>;
}
