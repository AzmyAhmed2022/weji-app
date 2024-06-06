import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controller } from 'src/app/shared/connection/wejiCallApi';
import { IUser } from 'src/app/shared/services/authentication.service';
import { GeneralService } from 'src/app/shared/services/general.service';
const userRequestUrl = Controller.apiController.userRequest;
export interface userRequest {
  Serial?: number;
  Mobile?: string;
  ClassificationSerial?: number;
  Gender?: number,
  GovSerial?: number,
  CitySerial?: number,
  StateSerial?: number,
  VillegeSerial?: number,
  UserName?: string;
  Address?: string;
  RequestDescription?: string;
  Notes?: string;
  Email?: string;
  ExpectedPrice?: string;
  ExpectedDeliverTime?: string
  CreateBy?: number,
  UpdateBy?: number,
  CreateDate?: Date,
  UpdateDate?: Date,
  ReturnCode?: number,
  Confirmed?: number;
  ConfirmTerms?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SaveUserRequestService {
  constructor(private _httpGeneralService: HttpClient) { }

  saveUserRequest(userRequest: userRequest) {

    var data =
      this._httpGeneralService.post(`${userRequestUrl}/SaveUserRequest`, userRequest);
    return data;
  }
  getUserRequests(userRequest: IUser) {

    var data =
      this._httpGeneralService.post(`${userRequestUrl}/GetUserRequests`, userRequest);
    return data;
  }

  updateRequestArrivalStatus(userRequest: userRequest) {

    var data =
      this._httpGeneralService.post(`${userRequestUrl}/UpdateRequestArrivalStatus`, userRequest);
    return data;
  }

}