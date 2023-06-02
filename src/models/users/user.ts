import { Email } from "./email";
import { PasswordHash } from "./password-hash";
import { UserID } from "./user-id";
import { Username } from "./username";

export class User {
    public readonly id: UserID;
    public username: Username;
    public email: Email;
    public passwordHash: PasswordHash;

    constructor(
        id: UserID,
        username: Username,
        email: Email,
        passwordHash: PasswordHash
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
