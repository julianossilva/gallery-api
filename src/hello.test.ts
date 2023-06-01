import { hello } from "@app/hello";

test("should say 'Hello World!'", () => {
    let msg: string = hello();
    debugger;
    expect(msg).toBe("Hello World!");
});
