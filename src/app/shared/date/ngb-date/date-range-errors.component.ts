import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { FormValidations } from '../../form-validations';

@Component({
  selector: 'app-date-range-errors',
  templateUrl: './date-range-errors.component.html',
  styleUrls: ['./date-range-errors.component.css']
})
export class DateRangeErrorsComponent implements OnInit {

  /**
   * 說明文字 - 起
   */
  @Input()
  labelForStart = '開始日期';

  /**
   * FormGroup 屬性名稱 - 起
   */
  @Input()
  startFormControlName: string;

  /**
   * 說明文字 - 迄
   */
  @Input()
  labelForEnd = '結束日期';

  /**
   * FormGroup 屬性名稱 - 迄
   */
  @Input()
  endFormControlName: string;

  /**
   * 起迄內容值正確時，
   * 二者是否皆為必填
   */
  @Input()
  requireBoth = false;

  @Input()
  clearRequireMessage = true;

  @Input()
  rangeErrorMessage = '時間區間錯誤，請確認';

  constructor(private form: FormGroupDirective) { }

  ngOnInit() {
    const startCtrl = this.form.control.get(this.startFormControlName);
    const endCtrl = this.form.control.get(this.endFormControlName);

    startCtrl.valueChanges.subscribe(() => {
      FormValidations.rangeCheck(startCtrl, endCtrl, 'rangeCheck', this.requireBoth, this.clearRequireMessage);
    });

    endCtrl.valueChanges.subscribe(() => {
      FormValidations.rangeCheck(startCtrl, endCtrl, 'rangeCheck', this.requireBoth, this.clearRequireMessage);
    });
  }

}
