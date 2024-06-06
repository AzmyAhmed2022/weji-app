import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Controller } from '../connection/wejiCallApi';
import { IAddress } from '../interfaces/address';
import { GeneralService } from './general.service';
const sharedtUrl = Controller.apiController.Shared;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _httpGeneralService: HttpClient) { }

  getAllAdresses(address: IAddress) {

    var data =
      this._httpGeneralService.post(`${sharedtUrl}/GetAllAdresses`, address);
    return data;

 
  }

  
}
