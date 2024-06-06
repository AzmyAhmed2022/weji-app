import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { SpinnerService } from './spinner.service';
@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notifySer: NotificationService, private _spinnerSer: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinnerSer.requestStarted();

    return next.handle(request)
      .pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this._spinnerSer.requestEnded();

          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
            this._spinnerSer.resetSpinner();
            this.notifySer.showError(errorMsg, "this is client side error")
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            this._spinnerSer.resetSpinner();
            this.notifySer.showError(errorMsg, "this is server side error")

          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}