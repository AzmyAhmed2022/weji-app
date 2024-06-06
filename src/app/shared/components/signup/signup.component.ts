import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { IAddress, ICity, IGov, IState, IVillege } from '../../interfaces/address';
import { AddressService } from '../../services/address.service';
import { AuthenticationService, IUser } from '../../services/authentication.service';
import { LocalService } from '../../services/local.service';
import { NotificationService } from '../../services/notification.service';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  submitted = false;
  showSpinner: number = 0
  GovArr: IGov[] = []
  GovArrBuffer = this.GovArr;
  CityArr: ICity[] = []
  CityArrBuffer = this.CityArr;
  StateArr: IState[] = []
  StateArrBuffer = this.StateArr;
  VillegeArr: IVillege[] = []
  VillegeArrBuffer = this.VillegeArr;
  UserSignUpForm!: FormGroup;
  SigUpObj: IUser = {};
  //حروف كبير وصغيره و # or !
  // regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\*\?])(?=.{8,})/;
  passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //voda mobinil etasalat we
  mobRegex = '^01[0-2,5]{1}[0-9]{8}$'


  private stream: Subject<void> = new Subject<void>();
  constructor(private _router: Router, private _addresses: AddressService,
    private _auth: AuthenticationService, private _session: LocalService,
    private _fb: FormBuilder, public _spinner: NgxSpinnerService, private _notify: NotificationService,
    public translate: TranslateService, private modalService: BsModalService,
  ) { }
  ngOnInit(): void {
    this.creatForm()
    this.getAllAdresses();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.UserSignUpForm.controls;
  }
  creatForm() {
    this.UserSignUpForm = this._fb.group({
      Serial: [0],
      FullName: ['', Validators.required],
      Gender: [0, Validators.required],
      Mobile: ['0', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(this.mobRegex)

      ]],
      Email: [0, [Validators.required, Validators.email]],
      GovSerial: [0],
      CitySerial: [0],
      StateSerial: [0],
      VillegeSerial: [0],
      FullAddress: ['', Validators.required],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          Validators.pattern(this.passRegex)

        ]
      ],
      ConfirmPassword: ['', Validators.required],
      AcceptTerms: [false, Validators.requiredTrue]
    });
  }
  selectAddress(searchBy: string) {
    this.SigUpObj = this.UserSignUpForm.value;
    // this.SigUpObj.Mobile = 0 + '' + this.SigUpObj.Mobile;
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
  saveAndActivateUser() {
    this.submitted = true;
    //valdate form in html
    if (this.UserSignUpForm.invalid) {
      return;
    }
    this.showSpinner = 1;

    //validate form in ts
    this.SigUpObj = this.UserSignUpForm.value;
    this.SigUpObj.Confirmed = 0;
    this.SigUpObj.ConfirmationCode = String(Math.floor(Math.random() * 965418));
    // if (!this.SigUpObj) {
    //   this._notify.showValidation('COMPLETEDATA')
    //   return
    // }
    // if (!this.SigUpObj.FullName || this.SigUpObj.FullName == '') {
    //   this._notify.showValidation("FULLNAME");
    //   return
    // }
    // if (!this.SigUpObj.Gender) {
    //   this._notify.showValidation("GENDER");
    //   return
    // }

    // if (!this.SigUpObj.Mobile || this.SigUpObj.Mobile == '0') {
    //   this._notify.showValidation("ENTERPHONENUMBER");
    //   return
    // }
    // if (!this.SigUpObj.GovSerial || this.SigUpObj.GovSerial == 0) {
    //   this._notify.showValidation("GOV");
    //   return
    // }
    // if (!this.SigUpObj.FullAddress || this.SigUpObj.FullAddress == '') {
    //   this._notify.showValidation("FULLADDRESS");
    //   return
    // }
    // if (!this.SigUpObj.Password || this.SigUpObj.Password == '') {
    //   this._notify.showValidation("ENTERPASSWORD");
    //   return
    // }
    // if (!this.SigUpObj.ConfirmPassword || this.SigUpObj.ConfirmPassword == '') {
    //   this._notify.showValidation("CONFIRMPASSWORD");
    //   return
    // }
    if
      (this.SigUpObj.ConfirmPassword !== this.SigUpObj.Password) {
      this._notify.showValidation("PASSWORDNOTMATCH");
      return
    }
    this.saveUserData();
  }
  saveUserData() {
    this._auth.saveUserData(this.SigUpObj)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
        console.log("User Data From Db in Sign Up " + res)
        if (res) {
          debugger
          if (res.Value.Table) {
            let dbResponse: any = {};
            dbResponse = res.Value.Table[0];
            if (dbResponse.Serial && dbResponse.ConfirmationCode) {
              this._session.saveSessionData('UserData', dbResponse);
              this._spinner.show();
              this.sendConfirmationCodeByEmail(dbResponse);
              // this.sendConfirmationCodeByMobile(dbResponse)
              this._spinner.hide();
              this._notify.showDbWarn("WAITCONFIRMATIONCODE");
              this.showSpinner = 0;
              this._router.navigateByUrl('/main/activation-code')
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
  sendConfirmationCodeByEmail(dbResponse: any) {
    this._auth.SendConfirmationCodeByMailFromSetting(dbResponse)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
      });
  }
  sendConfirmationCodeByMobile(dbResponse: any) {
    this._auth.SendConfirmationCodeByPhoneFromSetting(dbResponse)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
      });
  }
  getUserData() {
    this._auth.getUserData(this.SigUpObj)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
        console.log("User Data From Db in Sign Up " + res)
        if (res) {
          this.SigUpObj = res.Value.Table[0];
          if (this.SigUpObj.Serial && this.SigUpObj.ConfirmationCode) {
            this._session.saveSessionData('UserData', this.SigUpObj);
            this._spinner.show();
            this._notify.showDbWarn("WAITCONFIRMATIONCODE")
            this._router.navigateByUrl('/main/activation-code')
          }
          else {
            this._notify.showDbWarn("ERROR")
          }
        }
      });
  }
  getAllAdresses() {
    let allAddresser: IAddress = {}
    this._addresses.getAllAdresses(allAddresser)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
        console.log("Adresses in Sign Up " + res)
        if (res) {
          this.GovArr = res.Table;
          this.GovArrBuffer = res.Table;
          this.CityArrBuffer = res.Table1;
          this.StateArrBuffer = res.Table2;
          this.VillegeArrBuffer = res.Table3;
        }
      });
  }
  modalRef!: BsModalRef;

  openTermsModal() {
    let initialState: any = {};
    initialState.comp = 'signup'
    this.modalRef = this.modalService.show(TermsAndConditionsComponent, { initialState });
  }
  ngOnDestroy() {
    this.stream.next();
    this.stream.complete();
  }
}
