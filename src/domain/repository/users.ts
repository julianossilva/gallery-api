import { Username, User, EmailAddress, UserID } from "@domain/model/users";

export class UserRepositoryError extends Error {
    constructor() {
        super("User repository error.");
    }
}

export interface UserRepository {
    findByUsername(username: Username): Promise<User | null>;
    find(userID: UserID): Promise<User | null>;
    create(user: User): Promise<void>;

    hasUserWithEmailAddress(address: EmailAddress): Promise<boolean>;
    hasUserWithUsername(username: Username): Promise<boolean>;
}
