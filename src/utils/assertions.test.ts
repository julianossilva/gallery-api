import { isUUID } from "./assertions";

test("should isUUID works", () => {
    expect(isUUID("jkdksjk")).toBe(false);
    expect(isUUID("f5f57259-6e11-4ccb-8acf-df6f5f3eee88")).toBe(true);
});
