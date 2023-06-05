import { PasswordHash } from "./password-hash";

test("should reject empty hashs", () => {
    expect(() => {
        new PasswordHash("");
    }).toThrow();
});

test("should reject hash with more than 255 char", () => {
    expect(() => {
        new PasswordHash("".padEnd(256, "a"));
    }).toThrow();
});

test("should create correctly a new password hash", () => {
    let passwordHash = new PasswordHash("shhh");

    expect(passwordHash.value).toBe("shhh");
});
