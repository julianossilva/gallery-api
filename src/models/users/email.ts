import { EmailID } from "./email-id";
import { EmailAddress } from "./email-address";
import { EmailValidationCode } from "./email-validation-code";
import { Datetime } from "@app/utils/datetime";

export class Email {
    public id: EmailID;
    public address: EmailAddress;
    public token: EmailValidationCode | null;
    public validated: boolean;
    public created: Datetime;
    public deleted: Datetime | null;

    constructor(
        id: EmailID,
        address: EmailAddress,
        token: EmailValidationCode | null,
        validated: boolean,
        created: Datetime,
        deleted: Datetime | null
    ) {
        this.id = id;
        this.address = address;
        this.token = token;
        this.validated = validated;
        this.created = created;
        this.deleted = deleted;
    }
}
