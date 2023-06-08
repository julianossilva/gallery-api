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
            this.luxonDateTime = luxon.DateTime.fromMillis(arg, {
                zone: "utc",
            });
            return;
        }

        if (typeof arg === "object") {
            this.luxonDateTime = luxon.DateTime.fromObject(
                {
                    year: arg.year,
                    month: arg.month,
                    day: arg.day,
                    hour: arg.hour,
                    minute: arg.minute,
                    second: arg.second,
                    millisecond: arg.millisecond,
                },
                { zone: "utc" }
            );
            return;
        }

        this.luxonDateTime = luxon.DateTime.now();
        this.luxonDateTime.setZone("utc");
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

    clone(): DateTime {
        return new DateTime(this.toMilliseconds());
    }

    static fromDate(date: Date): DateTime {
        return new DateTime(luxon.DateTime.fromJSDate(date).toMillis());
    }

    toString(): string {
        return this.luxonDateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ");
    }

    add(milliseconds: number): DateTime {
        return new DateTime(this.toMilliseconds() + milliseconds);
    }
}
