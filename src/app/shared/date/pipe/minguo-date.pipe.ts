import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'minguoDate',
})
export class MinguoDatePipe implements PipeTransform {
    transform(date: moment.Moment, args?: any): any {
        if (date) {
            let yyy = (date.year() - 1911).toString();
            if (yyy.length < 3) {
                yyy = yyy.padStart(3, '0');
            }
            const mmdd = date.format('MM/DD');
            return `${yyy}/${mmdd}`;
        } else {
            return date;
        }
    }
}
