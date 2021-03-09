import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { DateType } from '../date/date-type';

@Component({
  selector: 'app-time-ranged-input',
  templateUrl: './time-ranged-input.component.html',
  styleUrls: ['./time-ranged-input.component.css'],
})
export class TimeRangedInputComponent implements OnInit, OnChanges {
  maxDate: DateType;

  @Input() formSubmitted: boolean;
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() startControl: FormControl;
  @Input() endControl: FormControl;

  @Input() labelClass = 'col-sm-2';
  @Input() startFieldClass = 'col-sm-3';
  @Input() endFieldClass = 'col-sm-3';
  @Input() startFieldErrorMsg = '請輸入起始日期';
  @Input() endFieldErrorMsg = '請輸入結束日期';
  @Input() isDateValidErrorMsg = '請輸入合法日期';
  @Input() isDateRangeValidErrorMsg = '起始日不得大於終止日';

  submitted = false;

  constructor() {}

  ngOnInit() {
    this.initialDatepicker();
  }

  ngOnChanges() {
    this.submitted = this.formSubmitted;
    console.log('ngOnChanges...');
    console.log(this.submitted );
  }

  private initialDatepicker() {
    const now = new Date();
    const year = now.getFullYear() - 1911;
    const month = now.getMonth() + 1;
    const date = now.getDate();
    this.maxDate = { year: year, month: month, day: date };
  }

  showErrors(control: AbstractControl) {
    if (control) {
      const { dirty, touched, errors } = control;
      return errors && this.formSubmitted;
    }
    // console.log('showErrors...');
    // console.log(this.formSubmitted);
    return false;
  }
}
