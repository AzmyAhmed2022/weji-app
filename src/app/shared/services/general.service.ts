import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, catchError, finalize, map, Observable, tap } from 'rxjs';
import { ExceptionService } from './exception.service';
import { HttpErrorInterceptor } from './httperrorinterceptor.service';
import { SpinnerService } from './spinner.service';

const apiUrl = 'http://localhost:5140/api';
@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  headers = this.getHeader();
  urlData: any = {};
  homeDataJson: any;
  constructor(private http: HttpClient, private _exceptionService: ExceptionService,
    public _spinner: SpinnerService
  ) {
    this.getJSON().subscribe(data => {
      console.log(data);
      this.urlData = data;
    });

    if (!this.urlData) {
      this.urlData = apiUrl;
    }

  }
  public getJSON(): Observable<any> {
    return this.http.get("/assets/jsonFiles/apiUrl.json");
  }

  public getHomeJSON(): Observable<any> {
    return this.http.get("/assets/jsonFiles/apiSetting.json");
  }


  generalPost(url: string, body: any) {
    this.showSpinner.next(true);
    this._spinner.show();
    return this.http
      .post(apiUrl + '/' + url, body, { headers: this.headers }).pipe(
        map(response => {
          let dbRes = <any>response;
          if (dbRes) {
            this.showSpinner.next(false);
            this._spinner.hide();

          }
          return dbRes;
        }),
        catchError(error => {
          this._exceptionService.catchBadResponse
          this.showSpinner.next(false)
          this._spinner.hide();

          return error
        }),
        finalize(() => {
          this.showSpinner.next(false)
          this._spinner.hide();
        }

        ));
  }

  generalPut(url: string, body: any, id: number) {
    return this.http.put(apiUrl + '/' + url + '/' + id, body, { headers: this.headers });
  }
  generalDelete(url: string, id: number) {
    return this.http.delete(apiUrl + '/' + url + '/' + id, { headers: this.headers });
  }
  generalGet(url: string, id: number) {
    return this.getWith(apiUrl + '/' + url + '/' + id)
  }

  getWith(url: string) {
    return this.http
      .get(url, { headers: this.headers }).pipe(
        map(response => {
          let temp = <any>response;
          return temp;
        }),
      );

  }
  getHeader() {
    let userhost = window.location.host;

    let headers = {
      'Content-Type': 'application/json',
      'UserHost': userhost,
      'Authorization': 'Basic U2VjbG9naW5JZC8xLEJyYW5jaElkLzEsbGluay8zMTIwLFdvcmtGbG93UGF0aC8yNDczLEZvckRlYnVnL251bGwsQWNjb3VudElkLzEsQnJhbmNoZXNBcnIvMTQ2XzE5XzE3XzFfLE1vZHVsZUlkLzM5'
    };
    return headers;
  }
}
