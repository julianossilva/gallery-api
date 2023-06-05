export class Password {
    public value: string;

    constructor(value: string) {
        if (isInvalid(value)) throw new InvalidPasswordError(value);
        this.value = value;
    }
}

function isInvalid(value: string): boolean {
    return value.length < 8;
}

export class InvalidPasswordError extends Error {
    constructor(value: string) {
        super(`invalid password error: ${value}`);
    }
}
