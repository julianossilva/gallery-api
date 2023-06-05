import { isUUID } from "@utils/assertions";

export class EmailID {
    public readonly value: string;

    constructor(value: string) {
        if (!isUUID(value)) throw new InvalidEmailIDError(value);
        this.value = value;
    }
}

export class InvalidEmailIDError extends Error {
    constructor(value: string) {
        super(`invalid email id error: ${value}`);
    }
}
