import { DateTime } from "@utils/datetime";
import { Email } from "./email";
import { PasswordHash } from "./password-hash";
import { UserID } from "./user-id";
import { Username } from "./username";

export type UserConstructorArgs = {
    id: UserID;
    username: Username;
    email: Email;
    newEmail: Email | null;
    passwordHash: PasswordHash;
    created: DateTime;
    deleted: DateTime | null;
};

export class User {
    public readonly id: UserID;
    public username: Username;
    public email: Email;
    public newEmail: Email | null;
    public passwordHash: PasswordHash;
    public created: DateTime;
    public deleted: DateTime | null;

    constructor(args: UserConstructorArgs) {
        this.id = args.id;
        this.username = args.username;
        this.email = args.email;
        this.newEmail = args.newEmail;
        this.passwordHash = args.passwordHash;
        this.created = args.created;
        this.deleted = args.deleted;
    }

    get isValidated(): boolean {
        return this.email.validated;
    }
}
