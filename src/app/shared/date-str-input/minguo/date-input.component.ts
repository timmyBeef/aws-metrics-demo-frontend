import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html'
})
export class DateInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {
  }

}
