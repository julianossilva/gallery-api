import { Datetime } from "@app/utils/datetime";
import { Email } from "./email";
import { PasswordHash } from "./password-hash";
import { UserID } from "./user-id";
import { Username } from "./username";

export class User {
    public readonly id: UserID;
    public username: Username;
    public email: Email;
    public newEmail: Email | null;
    public passwordHash: PasswordHash;
    public created: Datetime;
    public deleted: Datetime | null;

    constructor(
        id: UserID,
        username: Username,
        email: Email,
        newEmail: Email | null,
        passwordHash: PasswordHash,
        created: Datetime,
        deleted: Datetime | null
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.newEmail = newEmail;
        this.passwordHash = passwordHash;
        this.created = created;
        this.deleted = deleted;
    }

    get isValidated(): boolean {
        return this.email.validated;
    }
}
