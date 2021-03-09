import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  private alertService: AlertService;

  constructor(private injector: Injector) {
    setTimeout(() => {
      this.alertService = injector.get(AlertService);
    });
  }

  // constructor(
  //   private alertService: AlertService
  // ) {}

  handler(event: any, isErr: boolean) {
    const arr = event.headers.keys();

    let alert = null;
    arr.forEach((entry) => {
      if (entry === 'cht-alert-message') {
        alert = this.b64DecodeUnicode(event.headers.get(entry));
      }
    });

    if (alert && typeof alert === 'string' && this.alertService) {
      if (isErr) {
        this.alertService.error(alert);
      } else {
        this.alertService.info(alert);
      }
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          console.log(event);
          if (event instanceof HttpResponse) {
            this.handler(event, false);
          }
        },
        (err: any) => {
          console.log('interceptor err...');
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            this.handler(err, true);
          }
        }
      )
    );
  }

  /*
   * Function to convert from UTF8 to Base64 solving the Unicode Problem
   * Requires: window.btoa and window.encodeURIComponent functions
   * More info: http://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
   * Samples:
   *      b64EncodeUnicode('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
   *      b64EncodeUnicode('\n'); // "Cg=="
   */
  public b64EncodeUnicode(str: string): string {
    if (window && 'btoa' in window && 'encodeURIComponent' in window) {
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
          return String.fromCharCode(('0x' + p1) as any);
        })
      );
    } else {
      console.warn(
        'b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions'
      );
      return null;
    }
  }

  /*
   * Function to convert from Base64 to UTF8 solving the Unicode Problem
   * Requires window.atob and window.decodeURIComponent functions
   * More info: http://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
   * Samples:
   *      b64DecodeUnicode('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
   *      b64DecodeUnicode('Cg=='); // "\n"
   */
  public b64DecodeUnicode(str: string): string {
    if (window && 'atob' in window && 'decodeURIComponent' in window) {
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(str), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    } else {
      console.warn(
        'b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions'
      );
      return null;
    }
  }
}

export const notificationInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NotificationInterceptor,
    multi: true,
    deps: [Injector],
  },
];
