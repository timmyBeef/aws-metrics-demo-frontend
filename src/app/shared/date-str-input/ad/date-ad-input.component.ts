import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-ad-input',
  templateUrl: './date-ad-input.component.html'
})
export class DateAdInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {
  }

}
