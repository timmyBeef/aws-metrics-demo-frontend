import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

@Injectable()
export class UiLoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0; // 用一個 request couter 來做判斷

  constructor(private loaderService: NgxUiLoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loaderService.start();
    return next.handle(req).pipe(
      finalize( () => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loaderService.stop();
        }
      })
    );
  }
}

export const uiLoaderInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UiLoaderInterceptor, multi: true },
];
