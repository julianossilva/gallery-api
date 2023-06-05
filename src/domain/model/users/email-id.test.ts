import { EmailID } from "./email-id";

test("should reject invalid uuid", () => {
    expect(() => {
        new EmailID("ldfjsfldkjfa");
    }).toThrow();
});

test("should accept valid uuids", () => {
    expect(() => {
        new EmailID("26ae0eb0-30ea-4402-99b4-787867b0485b");
    }).not.toThrow();
});
