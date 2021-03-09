import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'minguoDateTime',
})
export class MinguoDateTimePipe implements PipeTransform {
    transform(date: moment.Moment, args?: any): any {
        if (date) {
            let yyy = (date.year() - 1911).toString();
            if (yyy.length < 3) {
                yyy = yyy.padStart(3, '0');
            }
            const dateTime = date.format('MM/DD HH:mm:ss');
            return `${yyy}/${dateTime}`;
        } else {
            return date;
        }
    }
}
