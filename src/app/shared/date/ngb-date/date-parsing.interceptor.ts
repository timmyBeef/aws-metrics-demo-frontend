import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatesService } from '../dates.service';

/**
 * @see https://gist.github.com/martinobordin/39bb1fe3400a29c1078dec00ff76bba9
 */
@Injectable()
export class DateParsingHttpInterceptor implements HttpInterceptor {

    private dates: DatesService;

    constructor(private injector: Injector) {
        this.dates = injector.get(DatesService);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const body = event.body;
                        this.dates.convertToMoment(body);
                    }
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                        }
                    }
                }
            )
        );
    }
}
