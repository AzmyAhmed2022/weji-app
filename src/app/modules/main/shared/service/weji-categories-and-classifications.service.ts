import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Controller } from 'src/app/shared/connection/wejiCallApi';
import { iWejiCategories } from '../interface/iWejiCategories';
import { GeneralService } from 'src/app/shared/services/general.service';
const wejiCategoriesAndClassificationsUrl = Controller.apiController.wejiCategoriesAndClassifications;
@Injectable({
  providedIn: 'root'
})
export class WejiCategoriesAndClassificationsService {
  constructor(private _httpGeneralService: GeneralService) { }

 
  getWejiCategoriesAndClassifications(iWejiCategoriesParams: iWejiCategories) {
    var data =
      this._httpGeneralService.generalPost(`${wejiCategoriesAndClassificationsUrl}/GetWejiCategoriesAndClassifications`
        , iWejiCategoriesParams);
    return data;
  }
  
  // saveWejiCategories(iWejiCategoriesParams: iWejiCategories) {
  //   return this._httpGeneralService.post(
  //     `${wejiCategoriesAndClassificationsUrl}/SaveWejiCategories/`,
  //     iWejiCategoriesParams
  //   );
  // }
  // updateWejiCategories(iWejiCategoriesParams: iWejiCategories) {
  //   return this._httpGeneralService.put<iWejiCategories>(
  //     `${wejiCategoriesAndClassificationsUrl}/UpdateWejiCategories/` + iWejiCategoriesParams.serial,
  //     iWejiCategoriesParams
  //   );
  // }

  // deleteWejiCategories(iWejiCategoriesParams: iWejiCategories) {
  //   return this._httpGeneralService.post(`${wejiCategoriesAndClassificationsUrl}/DeleteWejiCategories/` + iWejiCategoriesParams.serial, iWejiCategoriesParams);
  // }
}