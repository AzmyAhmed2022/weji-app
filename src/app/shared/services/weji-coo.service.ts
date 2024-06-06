import { Injectable } from '@angular/core';
import { Controller } from '../connection/wejiCallApi';
import { GeneralService } from './general.service';
const wejiCooUrl = Controller.apiController.wejiCoo;
export interface IContactUs {
  Serial?: number,
  Email?: string,
  Content?: string
}
@Injectable({
  providedIn: 'root'
})
export class WejiCooService {

  constructor(private _httpGeneralService: GeneralService) { }

  saveContactUs(wejiCooUrl: IContactUs) {
    var data =
      this._httpGeneralService.generalPost(`${wejiCooUrl}/SaveContactUs`, wejiCooUrl);
    return data;

  }
}