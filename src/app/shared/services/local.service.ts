import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));

  }

  public getData(key: string) {
    const data = localStorage.getItem(key);
    return (data) ? (JSON.parse(data)) : [];

  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public saveSessionData(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));

  }

  public getSessionData(key: string) {
    const data = sessionStorage.getItem(key);
    return (data) ? (JSON.parse(data)) : [];

  }
  public removeSessionData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearSessionData() {
    sessionStorage.clear();
  }




  // public get(key: string) {
  //   const data = localStorage.getItem(key);
  //   return (data) ? (JSON.parse(data)) : [];
  // }

  // public set(key: string, data: any) {
  //   localStorage.setItem(key, JSON.stringify(data));
  // }

  // public reset() {
  //   localStorage.clear();
  // }
}