import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import { IAddress, ICity, IGov, IState, IVillege } from 'src/app/shared/interfaces/address';
import { AddressService } from 'src/app/shared/services/address.service';
import { IUser } from 'src/app/shared/services/authentication.service';
import { LocalService } from 'src/app/shared/services/local.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SaveUserRequestService } from '../../service/save-user-request.service';
@Component({
  selector: 'app-save-user-request',
  templateUrl: './save-user-request.component.html',
  styleUrls: ['./save-user-request.component.scss']
})
export class SaveUserRequestComponent implements OnInit, OnDestroy {
  showTermsFlag: number = 0;
  wjiclassificationObj: any = {};
  userRequestForm!: FormGroup;
  userRequestObj: any = {};
  UserData: IUser = {};
  GovArr: IGov[] = []
  GovArrBuffer = this.GovArr;
  CityArr: ICity[] = []
  CityArrBuffer = this.CityArr;
  StateArr: IState[] = []
  StateArrBuffer = this.StateArr;
  VillegeArr: IVillege[] = []
  VillegeArrBuffer = this.VillegeArr;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  mobRegex = '^01[0-2,5]{1}[0-9]{8}$'
  submitted = false;
  showSpinner: number = 0;
  constructor(public modalRef: BsModalRef, public modalService: BsModalService,
    private _fb: FormBuilder,
    private _userRequest: SaveUserRequestService, public translate: TranslateService,
    private _addresses: AddressService, private _localStore: LocalService,
    private notify: NotificationService
  ) {
    this.wjiclassificationObj = modalService.config.initialState
    console.log('wjiclassificationObj is =' + this.wjiclassificationObj)
    if (this._localStore.getSessionData("UserData")
    ) {
      this.UserData = this._localStore.getSessionData("UserData");
    }
  }

  ngOnInit(): void {
    this.creatForm();
    this.getAllAdresses();
  }


  get f(): { [key: string]: AbstractControl } {
    return this.userRequestForm.controls;
  }
  creatForm() {
    this.userRequestForm = this._fb.group({
      Serial: 0,
      Mobile: [this.UserData.Mobile ? this.UserData.Mobile : '0', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(this.mobRegex)
      ]],
      ClassificationSerial: this.wjiclassificationObj.classificationSerial,
      UserName: [this.UserData.FullName ? this.UserData.FullName : '', Validators.required],
      Address: [this.UserData.FullAddress ? this.UserData.FullAddress : '', Validators.required],
      GovSerial: [this.UserData.GovSerial ? this.UserData.GovSerial : '', Validators.required],
      CitySerial: [this.UserData.CitySerial ? this.UserData.CitySerial : ''],
      StateSerial: [this.UserData.StateSerial ? this.UserData.StateSerial : ''],
      VillegeSerial: [this.UserData.VillegeSerial ? this.UserData.VillegeSerial : ''],
      Gender: [this.UserData.Gender ? this.UserData.Gender : ''],
      RequestDescription: ['', Validators.required],
      Notes: [''],
      Email: [this.UserData.Email ? this.UserData.Email : '', [Validators.required, Validators.email]],
      ExpectedPrice: [''],
      ExpectedDeliverTime: [''],
      Confirmed: [0, Validators.requiredTrue],
      ConfirmTerms: [0, Validators.requiredTrue]
    });
  }

  saveUserRequest() {
    this.userRequestObj = this.userRequestForm.value;
    this.submitted = true;
    this.showSpinner = 1;

    //valdate form in html
    if (this.userRequestForm.invalid) {
      return;
    }
    if (this.userRequestObj.UserName == '' || !this.userRequestObj.UserName) {
      this.notify.showValidation("ENTERFULLNAME")
      return
    }
    else if (this.userRequestObj.Gender == '' || !this.userRequestObj.Gender) {
      this.notify.showValidation("ENTERGENDER")
      return
    }
    else if (this.userRequestObj.Mobile == '' || !this.userRequestObj.Mobile) {
      this.notify.showValidation("ENTERPHONENUMBER")
      return
    }
    else if (this.userRequestObj.GovSerial == '' || !this.userRequestObj.GovSerial) {
      this.notify.showValidation("ENTERGOV")
      return
    }
    else if (this.userRequestObj.Address == '' || !this.userRequestObj.Address) {
      this.notify.showValidation("ENTERADDRESS")
      return
    }
    else if (this.userRequestObj.RequestDescription == '' || !this.userRequestObj.RequestDescription) {
      this.notify.showValidation("ORDERDETAILS")
      return
    }
    this.userRequestObj.ConfirmTerms = +this.userRequestObj.ConfirmTerms;
    if (this.userRequestObj.ConfirmTerms == 0) {
      this.notify.showValidation("TERMSACCEPT")
      return
    }
    this.userRequestObj.Confirmed = +this.userRequestObj.Confirmed;
    this.userRequestObj.CreateBy = this.UserData.Serial ? this.UserData.Serial : 0;
    console.log("User Request Form :", this.userRequestObj)
    if (this.userRequestObj.Serial > 0) {
      this._userRequest.saveUserRequest(this.userRequestObj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(c => {

        this.onOpenAlert();
        this.showSpinner = 0;

      }
      );

      this.modalRef.hide();
    } else {
      this._userRequest.saveUserRequest(this.userRequestObj).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(c => {
          let resData: any = c;
          if (resData.SerializerSettings != null || resData.SerializerSettings != undefined) {
            this.notify.showError(resData.Value, "SaveUserRequestController")
          } else {
            this.onOpenAlert();
            this.modalRef.hide();
          }

        }

        );


    }
  }
  onOpenAlert() {
    this.notify.showDbSucess("REQUESTSUCESS")
    this.userRequestForm.reset();
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
    this.userRequestObj = this.userRequestForm.value;
    switch (searchBy) {
      case 'Gov':
        this.CityArr = [];
        this.StateArr = [];
        this.VillegeArr = [];
        this.CityArr = this.CityArrBuffer.filter(ele => ele.GovSerial == this.userRequestObj.GovSerial);
        break;
      case 'City': this.StateArr = this.StateArrBuffer.filter(ele => ele.CitySerial == this.userRequestObj.CitySerial);
        break;
      case 'State': this.VillegeArr = this.VillegeArrBuffer.filter(ele => ele.StateSerial == this.userRequestObj.StateSerial);
        break;

    }
  }
  showTerms:boolean=false;
  acceptterms(){
    this.showTerms=!this.showTerms;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}



