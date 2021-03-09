import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private toastr: ToastrService) {}

  info(message: string) {
    this.toastr.info(
      '<span class="now-ui-icons ui-1_bell-53"></span>' + message,
      '',
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-info alert-with-icon',
        positionClass: 'toast-bottom-right',
      }
    );
  }

  error(message: string) {
    this.toastr.error(
      '<span class="now-ui-icons ui-1_bell-53"></span>' + message,
      '',
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-bottom-right',
      }
    );
  }

  markFormFieldsAsDirtyAndTouched(form: FormGroup) {
    console.log(form.controls);

    console.log(typeof(form.controls));
    for (let i in form.controls) {
      form.controls[i].markAsDirty();
      form.controls[i].markAsTouched();
      form.controls[i].updateValueAndValidity();
    }
  }
}
