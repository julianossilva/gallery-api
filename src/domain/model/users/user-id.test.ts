import { UserID } from "./user-id";

test("should reject invalid uuids", () => {
    expect(() => {
        new UserID("asdakdlkad");
    }).toThrow();
});

test("should accept valid uuids", () => {
    expect(() => {
        new UserID("26ae0eb0-30ea-4402-99b4-787867b0485b");
    }).not.toThrow();
});
