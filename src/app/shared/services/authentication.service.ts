import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controller } from '../connection/wejiCallApi';
import { GeneralService } from './general.service';
const userAuthUrl = Controller.apiController.userAuth;
export interface IMsgControl {
  serial?: number;
  userSerial?: number;
  message?: string;
  sentDate?: Date;
  sender?: number;
  msgPrice?: number;
  rowsCount?: number;
  mobile?: number;
  messageType?: number;
}

export interface IUser {
  Serial?: number;
  FullName?: String;
  Gender?: number;
  FullAddress?: String;
  Mobile?: String;
  Email?: String;
  Password?: String;
  ConfirmPassword?: String;
  GovSerial?: number;
  CitySerial?: number;
  StateSerial?: number;
  VillegeSerial?: number;
  ConfirmationCode?: string;
  Confirmed?: number;
  CreateBy?: number,
  UpdateBy?: number,
  CreateDate?: Date,
  UpdateDate?: Date,
  ReturnCode?: number,
  LoginStatus?: number,
  AcceptTerms?: boolean,
  LoginDate?: Date,
  LogoutDate?: Date,
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _httpGeneralService: GeneralService) { }
  //login area
  getUseByMobile(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/GetUseByMobile`, user);
    return data;

  }
  saveUserData(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/SaveUserData`, user);
    return data;

  }
  activateUser(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/ActivateUser`, user);
    return data;

  }

  resetUserPassword(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/ResetUserPassword`, user);
    return data;

  }
  updateLoginStatus(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/UpdateLoginStatus`, user);
    return data;

  }
  getUserData(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/GetUserData`, user);
    return data;


  }
  SendConfirmationCodeByMailFromSetting(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/SendConfirmationCodeByMailFromSetting`, user);
    return data;
  }

  SendConfirmationCodeByPhoneFromSetting(user: IUser) {
    var data =
      this._httpGeneralService.generalPost(`${userAuthUrl}/SendConfirmationCodeByPhoneFromSetting`, user);
    return data;
  }

}
