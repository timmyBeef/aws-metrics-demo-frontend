import { ValidatorFn, FormGroup } from '@angular/forms';

export const validateRangedDate = (field1, field2): ValidatorFn => (control: FormGroup) => {
  const v1 = control.get(field1).value;
  const v2 = control.get(field2).value;
  console.log(v1);
  console.log(v2);

  if ((v1 && v1.length === 0) || (v2 && v2.length === 0)) {
    return null;
  }

  // if (!v1.match(/^\d{3}\/\d{2}\/\d{2}$/)) {
  //   return { dateRangedTime: { invalid: v1 } };
  // }
  // if (!v2.match(/^\d{3}\/\d{2}\/\d{2}$/)) {
  //   return { dateRangedTime: { invalid: v2 } };
  // }
  const date1 = v1.substring(0, 3) + v1.substring(4, 6) + v1.substring(7);
  const date2 = v2.substring(0, 3) + v2.substring(4, 6) + v2.substring(7);

  if (date1 > date2) {
    console.log('is not Valid');
    return { dateRangedTime: { invalid: date1 + 'is bigger than' + date2 } };
  }

  return null;
  
};
