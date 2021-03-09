import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DatesService {

    // Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
    iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    iso = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

    constructor() { }

    isIso8601(value: string): boolean {
        return value && this.iso8601.test(value);
    }

    convertToMoment(obj): void {
        if (obj && typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
                const value = obj[key];
                if (this.isIso8601(value) || this.iso.test(value)) {
                    obj[key] = moment(value);
                } else if (typeof value === 'object') {
                    this.convertToMoment(value);
                }
            }
        }
    }

    now() {
        return moment().subtract(1911, 'years').format('YYYY-MM-DD').substring(1).replace(/-/g, '/');
    }

    adDate() {
        return moment().format('YYYY/MM/DD');
    }

    adYearMonth() {
        return moment().format('YYYY/MM');
    }

    adYear() {
        return moment().format('YYYY');
    }
}
