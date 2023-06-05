export const MAX_USERNAME_LENGTH: number = 200;

export class Username {
    public readonly value: string;

    constructor(value: string) {
        if (isInvalid(value)) throw new InvalidUsernameError(value);

        this.value = value;
    }
}

function isInvalid(value: string): boolean {
    let regex = new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$");
    return (
        value.length == 0 ||
        value.length > MAX_USERNAME_LENGTH ||
        !regex.test(value)
    );
}

export class InvalidUsernameError extends Error {
    public value: string;

    constructor(value: string) {
        super(`invalid username error: ${value}`);

        this.value = value;
    }
}
