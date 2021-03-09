import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-year-month-ad-input',
  templateUrl: './year-month-ad-input.component.html'
})
export class YearMonthAdInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {
  }

}
