import { isUUID } from "@utils/assertions";

export class UserID {
    public readonly value: string;

    constructor(value: string) {
        if (!isUUID(value)) throw new InvalidUserIDError(value);

        this.value = value;
    }
}

export class InvalidUserIDError extends Error {
    constructor(value: string) {
        super(`invalid user id: ${value}`);
    }
}
