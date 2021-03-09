import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastr: ToastrService) {
    toastr.toastrConfig.enableHtml = true;
  }

  public info(message: string, timeOut: number = 3000) {
    this.toastr.info(
      '<span class="now-ui-icons ui-1_bell-53"></span>' + message,
      '',
      {
        timeOut: timeOut,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-info alert-with-icon',
        positionClass: 'toast-bottom-right',
      }
    );
  }

  public error(message: string) {
    this.toastr.error(
      '<span class="now-ui-icons ui-1_bell-53"></span>' + message,
      '',
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-bottom-right',
      }
    );
  }

  // public success(msg: string, title?: string): void {
  //     setTimeout(() => {
  //         const activeToast = this.toastr.success(msg, title);

  //         // 自動關閉
  //         setTimeout(() => {
  //             this.toastr.clear(activeToast.toastId);
  //         }, this.toastr.toastrConfig.timeOut);
  //     });
  // }

  // public error(msg: string, title?: string): void {
  //     setTimeout(() => {
  //         const activeToast = this.toastr.error(msg, title);

  //         // 自動關閉，但比正常訊息多顯示 10 倍時間
  //         setTimeout(() => {
  //             this.toastr.clear(activeToast.toastId);
  //         }, this.toastr.toastrConfig.timeOut * 10);
  //     });
  // }

  // public info(msg: string, title?: string): void {
  //     setTimeout(() => {
  //         const activeToast = this.toastr.info(msg, title);

  //         // 自動關閉
  //         setTimeout(() => {
  //             this.toastr.clear(activeToast.toastId);
  //         }, this.toastr.toastrConfig.timeOut);
  //     });
  // }

  // public warning(msg: string, title?: string): void {
  //     setTimeout(() => {
  //         const activeToast = this.toastr.warning(msg, title);

  //         // 自動關閉，但比正常訊息多顯示 4 倍時間
  //         setTimeout(() => {
  //             this.toastr.clear(activeToast.toastId);
  //         }, this.toastr.toastrConfig.timeOut * 4);
  //     });
  // }

  public clear(toastId?: number) {
    this.toastr.clear(toastId);
  }
}
