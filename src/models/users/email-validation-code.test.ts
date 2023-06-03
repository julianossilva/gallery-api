import { EmailValidationCode } from "./email-validation-code";

test("should reject empty codes", () => {
    expect(() => {
        new EmailValidationCode("");
    }).toThrow();
});

test("should accept a valid code", () => {
    expect(() => {
        new EmailValidationCode("".padEnd(200, "0"));
    }).not.toThrow();
});

test("should reject codes with more than 200 char", () => {
    expect(() => {
        new EmailValidationCode("".padEnd(201, "0"));
    }).toThrow();
});

test("should EmailValidationCode.generate return an instance of EmailValidationCode", () => {
    expect(EmailValidationCode.generate()).toBeInstanceOf(EmailValidationCode);
});
