import { Injectable } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Injectable({
    providedIn: 'root',
})
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
    delimiter = '/';

    parse(value: string): NgbDateStruct {
        if (value) {
            const values = value.split(this.delimiter);
            if (values && values.length === 3) {
                return {
                    year: Number(values[0]),
                    month: Number(values[1]),
                    day: Number(values[2]),
                };
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        if (date) {
            const year = date.year.toString().padStart(3, '0');
            const month = date.month.toString().padStart(2, '0');
            const day = date.day.toString().padStart(2, '0');
            return `${year}${this.delimiter}${month}${this.delimiter}${day}`;
        } else {
            return '';
        }
    }
}
