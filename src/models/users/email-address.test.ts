import { EmailAddress } from "./email-address";

test("should email address reject empty emails", () => {
    expect(() => {
        new EmailAddress("");
    }).toThrow();
});

test("should email address works", () => {
    let address = new EmailAddress("ana@email.com");

    expect(address.value).toBe("ana@email.com");
});
