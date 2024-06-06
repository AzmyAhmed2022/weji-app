import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { UserRequestListComponent } from '../modules/main/shared/component/user-request-list/user-request-list.component';
import { iWejiCategories } from '../modules/main/shared/interface/iWejiCategories';
import { SaveUserRequestService, userRequest } from '../modules/main/shared/service/save-user-request.service';
import { IGov, ICity, IState, IVillege, IAddress } from '../shared/interfaces/address';
import { AddressService } from '../shared/services/address.service';
import { AuthenticationService, IUser } from '../shared/services/authentication.service';
import { LocalService } from '../shared/services/local.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  GovArr: IGov[] = []
  GovArrBuffer = this.GovArr;
  CityArr: ICity[] = []
  CityArrBuffer = this.CityArr;
  StateArr: IState[] = []
  StateArrBuffer = this.StateArr;
  VillegeArr: IVillege[] = []
  VillegeArrBuffer = this.VillegeArr;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  wejiCategories: any[] = [];
  userequestArr: any[] = [];
  userequestArrBuffer: any[] = [];
  mobRegex = '^01[0-2,5]{1}[0-9]{8}$'
  passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  constructor(private _router: Router, private _addresses: AddressService,
    private _auth: AuthenticationService, private _session: LocalService, private localStore: LocalService,
    private _fb: FormBuilder, private _localStore: LocalService, public _spinner: NgxSpinnerService, private _notify: NotificationService,
    public translate: TranslateService, private modalService: BsModalService, private _userRequest: SaveUserRequestService
  ) {

    if (this._localStore.getSessionData("UserData")
    ) {
      this.UserData = this._localStore.getSessionData("UserData");
    }
    this.wejiCategories = this.localStore.getSessionData('wejiCategories');
    this.wejiCategories = this.wejiCategories.filter(ele => ele.IsLogged == 0 && ele.UserType == 2)

  }
  ngOnInit(): void {
    this.creatForm()
    this.getAllAdresses();
    this.getUserRequests();

  }
  UserSignUpForm!: FormGroup;
  UserData: IUser = {};
  SigUpObj: IUser = {};
  submitted = false;
  showSpinner: number = 0
  creatForm() {
    this.UserSignUpForm = this._fb.group({
      Serial: [this.UserData.Serial],
      Mobile: [this.UserData.Mobile ? this.UserData.Mobile : '', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(this.mobRegex)

      ]],
      Email: [this.UserData.Mobile ? this.UserData.Email : '', [Validators.required, Validators.email]],
      Password: [this.UserData.Password ? this.UserData.Password : ''],
      ConfirmPassword: [this.UserData.Password ? this.UserData.Password : ''],
      FullName: [this.UserData.FullName ? this.UserData.FullName : '', Validators.required],
      FullAddress: [this.UserData.FullAddress ? this.UserData.FullAddress : '', Validators.required],
      GovSerial: [this.UserData.GovSerial ? this.UserData.GovSerial : '', Validators.required],
      CitySerial: [this.UserData.CitySerial ? this.UserData.CitySerial : ''],
      StateSerial: [this.UserData.StateSerial ? this.UserData.StateSerial : ''],
      VillegeSerial: [this.UserData.VillegeSerial ? this.UserData.VillegeSerial : ''],
      Gender: [this.UserData.Gender ? this.UserData.Gender : Validators.required]

    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.UserSignUpForm.controls;
  }
  editStatus: boolean = false;
  editProfile() {
    this.editStatus = !this.editStatus
  }
  editPassword: boolean = false;
  editPass() {
    if (this.editStatus == false) {
      this._notify.showDbWarn("اضغط على تعديل اولا")
      return
    }
    else {
      this.editPassword = !this.editPassword;

    }
  }
  saveAndActivateUser() {
    this.submitted = true;
    //valdate form in html
    if (this.UserSignUpForm.invalid) {
      return;
    }
    this.showSpinner = 1;
    //valdate form
    this.SigUpObj = this.UserSignUpForm.value;
    if (!this.SigUpObj) {
      this._notify.showValidation('COMPLETEDATA')
      return
    }
    if (!this.SigUpObj.FullName || this.SigUpObj.FullName == '') {
      this._notify.showValidation("FULLNAME");
      return
    }
    if (!this.SigUpObj.Gender) {
      this._notify.showValidation("GENDER");
      return
    }

    if (!this.SigUpObj.Mobile || this.SigUpObj.Mobile == '0') {
      this._notify.showValidation("ENTERPHONENUMBER");
      return
    }
    if (!this.SigUpObj.GovSerial || this.SigUpObj.GovSerial == 0) {
      this._notify.showValidation("GOV");
      return
    }
    if (!this.SigUpObj.FullAddress || this.SigUpObj.FullAddress == '') {
      this._notify.showValidation("FULLADDRESS");
      return
    }
    if (!this.SigUpObj.Password || this.SigUpObj.Password == '') {
      this._notify.showValidation("ENTERPASSWORD");
      return
    }
    if (!this.SigUpObj.ConfirmPassword || this.SigUpObj.ConfirmPassword == '') {
      this._notify.showValidation("CONFIRMPASSWORD");
      return
    }
    if (this.SigUpObj.ConfirmPassword !== this.SigUpObj.Password) {
      this._notify.showValidation("PASSWORDNOTMATCH");
      return
    }

    this.saveUserData();


  }
  getUserRequests() {
    this._userRequest.getUserRequests(this.UserData).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((c: any) => {
        // categort Statics
        let CatStatics: any = [];
        CatStatics = c.Value.Table
        this.userequestArrBuffer = c.Value.Table1;
        CatStatics.forEach((Cat: any) => {
          this.wejiCategories.forEach((element: any) => {
            if (Cat.Serial == element.Serial) {
              element.CatCount = Cat.CatCount
            }

          })
        });
      });

  }
  saveUserData() {
    this._auth.saveUserData(this.SigUpObj)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        console.log("User Data From Db in Edit Profile " + res)
        if (res) {
          if (res.Value.Table) {
            let dbResponse: any = {};
            dbResponse = res.Value.Table[0];
            if (dbResponse.Serial && dbResponse.ConfirmationCode) {
              this._session.saveSessionData('UserData', dbResponse);
              this._spinner.show();
              this._notify.showDbSucess("DETAILCHANGED")
              this.editStatus = false;
            }
            else if (dbResponse.Message && dbResponse.CheckFlag == 1) {
              this._notify.showDbError(dbResponse.Message)

            }
            else {
              this._notify.showDbError("ERROR")
            }
          }
          else {
            this._notify.showDbError("ERROR")

          }
        }
      });
  }
  getAllAdresses() {
    let allAddresser: IAddress = {}
    this._addresses.getAllAdresses(allAddresser)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        console.log("Adresses in  User Request " + res)
        if (res) {
          this.GovArr = res.Table;
          this.GovArrBuffer = res.Table;
          this.CityArrBuffer = res.Table1;
          this.CityArr = res.Table1;
          this.StateArrBuffer = res.Table2;
          this.StateArr = res.Table2;
          this.VillegeArrBuffer = res.Table3;
          this.VillegeArr = res.Table3;

        }
      });
  }
  selectAddress(searchBy: string) {
    this.SigUpObj = this.UserSignUpForm.value;
    switch (searchBy) {
      case 'Gov':
        this.CityArr = [];
        this.StateArr = [];
        this.VillegeArr = [];
        this.CityArr = this.CityArrBuffer.filter(ele => ele.GovSerial == this.SigUpObj.GovSerial);
        break;
      case 'City': this.StateArr = this.StateArrBuffer.filter(ele => ele.CitySerial == this.SigUpObj.CitySerial);
        break;
      case 'State': this.VillegeArr = this.VillegeArrBuffer.filter(ele => ele.StateSerial == this.SigUpObj.StateSerial);
        break;

    }
  }
  modalRef!: BsModalRef;

  userRequestModal(Cat: any) {
    if (this.userequestArrBuffer.length > 0) {
      this.userequestArr = this.userequestArrBuffer.filter(ele => ele.CatSerial == Cat.Serial)
      const initialState: any = {};
      initialState.Cat = {
        classificationSerial: 10,
        NameAr: Cat.NameAr,
        NameEn: Cat.NameEn
      }
      initialState.UserRequests = this.userequestArr;
      this.modalRef = this.modalService.show(UserRequestListComponent, { initialState });
    }
    else {
      this._notify.showDbWarn("NOORDERS")
    }

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
