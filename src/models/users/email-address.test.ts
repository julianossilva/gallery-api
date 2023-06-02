import {EmailAddress} from "./email-address";

test("should email address reject empty emails", () => {
    expect(() => {
        new EmailAddress("");
    }).toThrow();
});
