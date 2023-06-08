import { EmailID } from "./email-id";
import { EmailAddress } from "./email-address";
import { EmailValidationCode } from "./email-validation-code";

type EmailConstructorArgs = {
    id: EmailID;
    address: EmailAddress;
    code?: EmailValidationCode | null;
    validated?: boolean;
};

export class Email {
    public id: EmailID;
    public address: EmailAddress;
    public code: EmailValidationCode | null;
    public validated: boolean;

    constructor(args: EmailConstructorArgs) {
        this.id = args.id;
        this.address = args.address;
        this.code = args.code == undefined ? null : args.code;
        this.validated = args.validated == undefined ? false : args.validated;
    }

    generateCode() {
        this.code = EmailValidationCode.generate();
    }
}
