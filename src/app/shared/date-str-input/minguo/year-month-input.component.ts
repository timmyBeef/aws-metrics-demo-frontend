import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-year-month-input',
  templateUrl: './year-month-input.component.html'
})
export class YearMonthInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {
  }

}
