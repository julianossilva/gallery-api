import { Username } from "./username";

test("should reject empty username", () => {
    expect(() => {
        new Username("");
    }).toThrow();
});

test("should reject names stating with _", () => {
    expect(() => {
        new Username("_ana");
    }).toThrow();
});

test("should reject _ as username", () => {
    expect(() => {
        new Username("_");
    }).toThrow();
});

test("should accept valid usernames", () => {
    expect(() => {
        new Username("a");
        new Username("".padEnd(200, "a"));
    }).not.toThrow();
});
