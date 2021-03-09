import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbPeriod } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Injectable()
export class NgbCalendarMinguo extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }

    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    getWeeksPerMonth() {
        return 6;
    }

    getNext(date: NgbDate, period: NgbPeriod = 'd', number = 1) {
        let jsDate = this.toGregorian(date);

        switch (period) {
            case 'y':
                return new NgbDate(jsDate.getFullYear() + number, 1, 1);
            case 'm':
                jsDate = new Date(
                    jsDate.getFullYear(),
                    date.month + number - 1,
                    1,
                    12
                );
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                break;
            default:
                return date;
        }

        return this.fromGregorian(jsDate);
    }

    getPrev(date: NgbDate, period: NgbPeriod = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }

    getWeekday(date: NgbDate) {
        const jsDate = this.toGregorian(date);
        const day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }

    getWeekNumber(week: NgbDate[], firstDayOfWeek: number) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }

        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];

        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return (
            Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1
        );
    }

    getToday(): NgbDate {
        return this.fromGregorian(new Date());
    }

    isValid(date: NgbDate): boolean {
        if (
            !date ||
            !Number.isInteger(date.year) ||
            !Number.isInteger(date.month) ||
            !Number.isInteger(date.day)
        ) {
            return false;
        }

        const jsDate = this.toGregorian(date);

        return (
            !isNaN(jsDate.getTime()) &&
            jsDate.getFullYear() === date.year + 1911 &&
            jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day
        );
    }

    /**
     * Returns the equivalent Minguo date value for a give input Gregorian date.
     * `gdate` is a JS Date to be converted to Minguo date.
     */
    fromGregorian(gdate: Date): NgbDate {
        const date = new Date(gdate);
        return new NgbDate(
            date.getFullYear() - 1911,
            date.getMonth() + 1,
            date.getDate()
        );
    }
    /**
     * Returns the equivalent JS date value for a given Minguo date.
     * `minguoDate` is an Minguo date to be converted to Gregorian.
     */
    toGregorian(mingouDate: NgbDateStruct | NgbDate): Date {
        const date = new Date(
            mingouDate.year + 1911,
            mingouDate.month - 1,
            mingouDate.day
        );
        return date;
    }
}
