export interface ICountry {
    Serial?: number;
    ContinentSerial?: number;
    NameAr?: String;
    NameEn?: String;

}export interface IGov {
    Serial?: number;
    CountrySerial?: number;
    NameAr?: String;
    NameEn?: String;

}
export interface ICity {
    Serial?: number;
    GovSerial?: number;
    NameAr?: String;
    NameEn?: String;

}
export interface IState {
    Serial?: number;
    CitySerial?: number;
    NameAr?: String;
    NameEn?: String;

}
export interface IVillege {
    Serial?: number;
    StateSerial?: number;
    NameAr?: String;
    NameEn?: String;

}
export interface IAddress {
    CountrySerial?: number;
    GovSerial?: number;
    CitySerial?: number;
    StateSerial?: number;
    VillegeSerial?: number;
  
  
  }