import crypto from "node:crypto";

const VERIFICATION_CODE_LENGTH: number = 200;

const testVerificationCodeRegexp = (value: string) => {
    return new RegExp("^[0-9abcdef]{" + VERIFICATION_CODE_LENGTH + "}$").test(
        value
    );
};

export class EmailValidationCode {
    public readonly value: string;

    constructor(value: string) {
        if (isInvalid(value)) throw new InvalidEmailValidationCode(value);
        this.value = value;
    }

    static generate(): EmailValidationCode {
        return new EmailValidationCode(generateCode());
    }
}

function generateCode(): string {
    let chars = [];
    for (let i = 0; i < VERIFICATION_CODE_LENGTH / 2; i++) {
        chars.push(crypto.randomInt(15));
    }
    let code = Buffer.from(chars).toString("hex").toLowerCase();
    return code;
}

function isInvalid(value: string): boolean {
    return !testVerificationCodeRegexp(value);
}

export class InvalidEmailValidationCode extends Error {
    public value: string;

    constructor(value: string) {
        super(`invalid email validation code: ${value}`);
        this.value = value;
    }
}
