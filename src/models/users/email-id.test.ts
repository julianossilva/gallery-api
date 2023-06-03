import { EmailID } from "./email-id";

test("should reject regative values", () => {
    expect(() => {
        new EmailID(-1);
    }).toThrow();
});

test("should reject non integer ids", () => {
    expect(() => {
        new EmailID(3.14159);
    }).toThrow();
});

test("should email id be create correctly", () => {
    let emailID = new EmailID(42);

    expect(emailID.value).toBe(42);
});
