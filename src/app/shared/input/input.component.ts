import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  @Input() controlType = 'input';
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @Input() label: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {}

  showErrors() {
    const { dirty, touched, errors } = this.control;
    //console.log(dirty, touched, errors);
    const result = dirty && touched && errors;
    //console.log('result=', result);
    return result;
  }
}
