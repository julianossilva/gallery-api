import { Email } from "./email";
import { PasswordHash } from "./password-hash";
import { UserID } from "./user-id";
import { Username } from "./username";

export type UserConstructorArgs = {
    id: UserID;
    username: Username;
    email: Email;
    passwordHash: PasswordHash;
};

export class User {
    public readonly id: UserID;
    public username: Username;
    public email: Email;
    public passwordHash: PasswordHash;

    constructor(args: UserConstructorArgs) {
        this.id = args.id;
        this.username = args.username;
        this.email = args.email;
        this.passwordHash = args.passwordHash;
    }

    get isValidated(): boolean {
        return this.email.validated;
    }
}
