import z from "zod";

export class AssertionError extends Error {
    constructor() {
        super("assertion error");
    }
}

export function isUUID(value: string): boolean {
    return z.string().uuid().safeParse(value).success;
}

export function isUsername(value: string): boolean {
    let regexp = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,254}$");
    return regexp.test(value);
}

export function assertUsername(value: any): string {
    value = String(value);

    if (!isUsername(value)) throw new AssertionError();

    return value;
}

export function isEmail(value: string): boolean {
    return z.string().email().safeParse(value).success;
}

export function assertEmail(value: any): string {
    value = String(value);

    if (!isEmail(value)) throw new AssertionError();

    return value;
}

export function isPassword(value: string): boolean {
    return z.string().min(8).max(255).safeParse(value).success;
}

export function assertPassword(value: any): string {
    value = String(value);

    if (!isPassword(value)) throw new AssertionError();

    return value;
}
