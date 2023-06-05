import { EmailID } from "./email-id";
import { EmailAddress } from "./email-address";
import { EmailValidationCode } from "./email-validation-code";
import { DateTime } from "@utils/datetime";

type EmailConstructorArgs = {
    id: EmailID;
    address: EmailAddress;
    token: EmailValidationCode | null;
    validated: boolean;
    created: DateTime;
    deleted: DateTime | null;
};

export class Email {
    public id: EmailID;
    public address: EmailAddress;
    public token: EmailValidationCode | null;
    public validated: boolean;
    public created: DateTime;
    public deleted: DateTime | null;

    constructor(args: EmailConstructorArgs) {
        this.id = args.id;
        this.address = args.address;
        this.token = args.token;
        this.validated = args.validated;
        this.created = args.created;
        this.deleted = args.deleted;
    }
}
