export class EmailAddress {
    public readonly value: string;

    constructor(value: string) {
        value = value.trim();
        if (isInvalid(value)) throw new InvalidEmailAddressError(value);
        this.value = value;
    }
}

function isInvalid(value: string): boolean {
    return value.length === 0;
}

export class InvalidEmailAddressError extends Error {
    public value: string;

    constructor(value: string) {
        super(`invalid email address: ${value}`);
        this.value = value;
    }
}
