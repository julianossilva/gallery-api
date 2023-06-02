const MAX_HASH_LENGTH = 255;

export class PasswordHash {
    public readonly value: string;

    constructor(value: string) {
        if (isInvalid(value)) throw new InvalidPasswordHashError(value);
        this.value = value;
    }
}

function isInvalid(value: string): boolean {
    return value.length === 0 || value.length > MAX_HASH_LENGTH;
}

export class InvalidPasswordHashError extends Error {
    public value: string;

    constructor(value: string) {
        super(`invalid password hash error: ${value}`);
        this.value = value;
    }
}
