export class EmailID {
    public readonly value: number;

    constructor(value: number) {
        if (isInvalid(value)) throw new InvalidEmailIDError(value);
        this.value = value;
    }
}

function isInvalid(value: number): boolean {
    return value <= 0 || !Number.isInteger(value);
}

export class InvalidEmailIDError extends Error {
    public value: number;

    constructor(value: number) {
        super(`invalid email id error: ${value}`);

        this.value = value;
    }
}
