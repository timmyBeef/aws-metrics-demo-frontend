import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class NgbDateMomentAdapter extends NgbDateAdapter<moment.Moment> {
  fromModel(date: moment.Moment): NgbDateStruct {
    // console.log('fromModel date...');
    // console.log(date);

    date = moment(date);

    if (moment.isMoment(date)) {
    //   console.log('into isMoment date...');

      return {
        year: date.year() - 1911,
        month: date.month() + 1,
        day: date.date(),
      };
    }

    return null;
  }

  toModel(date: NgbDateStruct): moment.Moment {
    console.log('toModel date...');
    console.log(date);
    return date ? moment([date.year + 1911, date.month - 1, date.day]) : null;
  }
}
