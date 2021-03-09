import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validateDate(c: FormControl) {
  const value = c.value;

  if (!value.match(/^\d{3}\/\d{2}\/\d{2}$/)) {
    return { dateTime: { invalid: value } };
  }
  const yyy = +value.substring(0, 3);
  const mm = +value.substring(4, 6);
  const dd = +value.substring(7);

  const date = moment([yyy + 1911, mm - 1, dd]);
  console.log('moment...');
  console.log(date.format('YYYY-MM-DD'));

  if (!date.isValid()) {
    console.log('is not Valid');
    return { dateTime: { invalid: value } };
  }

  return null;
}
