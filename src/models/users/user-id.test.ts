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
