import { UserID } from "./user-id";

test("should reject negative ids", () => {
    expect(() => {
        new UserID(-1);
    }).toThrow();
});

test("should reject non integer values", () => {
    expect(() => {
        new UserID(1.1);
    }).toThrow();
});

test("should create a user id correctly", () => {
    let userID = new UserID(123);

    expect(userID.value).toBe(123);
});
