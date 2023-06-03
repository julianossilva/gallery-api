import * as luxon from "luxon";

export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export type DateObject = {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
};

export class DateTime {
    private luxonDateTime: luxon.DateTime;

    constructor(arg?: number | DateObject) {
        if (typeof arg === "number") {
            this.luxonDateTime = luxon.DateTime.fromMillis(arg);
            return;
        }

        if (typeof arg === "object") {
            this.luxonDateTime = luxon.DateTime.fromObject({
                year: arg.year,
                month: arg.month,
                day: arg.day,
                hour: arg.hour,
                minute: arg.minute,
                second: arg.second,
                millisecond: arg.millisecond,
            });
            return;
        }

        this.luxonDateTime = luxon.DateTime.now();
    }

    get year(): number {
        return this.luxonDateTime.year;
    }

    get month(): number {
        return this.luxonDateTime.month;
    }

    get day(): number {
        return this.luxonDateTime.day;
    }

    get hour(): number {
        return this.luxonDateTime.hour;
    }

    get minute(): number {
        return this.luxonDateTime.minute;
    }

    get second(): number {
        return this.luxonDateTime.second;
    }

    get millisecond(): number {
        return this.luxonDateTime.millisecond;
    }

    toMilliseconds(): number {
        return this.luxonDateTime.toMillis();
    }

    toString(): string {
        return this.luxonDateTime.toString();
    }
}
