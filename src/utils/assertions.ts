import z from "zod";

export class AssertionError extends Error {
    constructor() {
        super("assertion error");
    }
}

export function isUUID(value: any): boolean {
    return z.string().uuid().safeParse(value).success;
}
