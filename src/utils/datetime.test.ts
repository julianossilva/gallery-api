import { DateTime } from "./datetime";

test("should create a valid DateTime", () => {
    let dateTime = new DateTime({
        year: 2023,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5,
        millisecond: 6,
    });

    expect(dateTime.year).toBe(2023);
    expect(dateTime.month).toBe(1);
    expect(dateTime.day).toBe(2);
    expect(dateTime.hour).toBe(3);
    expect(dateTime.minute).toBe(4);
    expect(dateTime.second).toBe(5);
    expect(dateTime.millisecond).toBe(6);
});

test("should create a new DateTime from milliseconds", () => {
    let dateTime = new DateTime(0);

    expect(dateTime.year).toBe(1970);
    expect(dateTime.month).toBe(1);
    expect(dateTime.day).toBe(1);
    expect(dateTime.hour).toBe(0);
    expect(dateTime.minute).toBe(0);
    expect(dateTime.second).toBe(0);
    expect(dateTime.millisecond).toBe(0);
});

test("should toMilliseconds works correctly", () => {
    let x = Math.floor(Math.random() * 1000000);
    let dateTime = new DateTime(x);

    expect(dateTime.toMilliseconds()).toBe(x);
});

test("should create a new DateTime without arg", () => {
    expect(() => {
        new DateTime();
    }).not.toThrow();
});

test("to String works correctly", () => {
    let dateTime = new DateTime({
        year: 2023,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5,
        millisecond: 6,
    });

    debugger; // dateTime
    expect(dateTime.toString()).toBe("2023-01-02T03:04:05.006+00:00");
});
