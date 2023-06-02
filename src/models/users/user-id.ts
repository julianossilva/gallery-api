export class UserID {
    public readonly value: number;

    constructor(value: number) {
        if (isInvalid(value)) throw new InvalidUserIDError(value);

        this.value = value;
    }
}

function isInvalid(value: number): boolean {
    return value <= 0 || !Number.isInteger(value);
}

export class InvalidUserIDError extends Error {
    public value: number;

    constructor(value: number) {
        super(`invalid user id: ${value}`);
        this.value = value;
    }
}
