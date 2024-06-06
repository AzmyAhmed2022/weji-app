import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LocalService } from '../../services/local.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-activation-code',
  templateUrl: './activation-code.component.html',
  styleUrls: ['./activation-code.component.scss']
})
export class ActivationCodeComponent implements OnInit, OnDestroy {
  UserActivationForm!: FormGroup;
  UserData: any = {};
  activationCodeObj: any = {};
  timeLeft: number = 60;
  interval: any;
  codeRegx = new RegExp('^[0-9]+$');
  sendAgainFlag: number = 1;
  submitted: boolean = false;
  showSpinner = 0;
  private stream: Subject<void> = new Subject<void>();
  constructor(private _route: Router, private _auth: AuthenticationService,
    private localStore: LocalService, private _fb: FormBuilder, public translate: TranslateService,
    private _notify: NotificationService, private _session: LocalService) {
    this.$getUserData();
  }

  ngOnInit(): void {
    this.creatForm();
    this.sendAgainFlag = 0;
    this.counterToSendAgain();
  }
  $getUserData() {
    // userData
    this.UserData = this.localStore.getSessionData('UserData');
    console.log("userdata from SignUp", this.UserData)
  }
  get f(): { [key: string]: AbstractControl } {
    return this.UserActivationForm.controls;
  }
  creatForm() {
    this.UserActivationForm = this._fb.group({
      ConfirmationCode: ['', [Validators.required, Validators.pattern(this.codeRegx)]]

    });
  }
  confirmUserActivationCode() {
    // ---validate form html
    this.submitted = true;
    //valdate form in html
    if (this.UserActivationForm.invalid) {
      return;
    }
    this.showSpinner = 1;
    this.activationCodeObj = this.UserActivationForm.value
    // if (this.activationCodeObj.ConfirmationCode == '') {
    //   this._notify.showValidation("ENTERCONFIRMATIONCODE");
    //   return
    // }
    if (this.UserData && this.UserData.ConfirmationCode > 0) {
      if (+this.UserData.ConfirmationCode == this.activationCodeObj.ConfirmationCode) {
        this.activateUser();
      }
      else {
        this._notify.showValidation("CONFRMATIONCODENOTMATCH");
      }

    }
  }
  activateUser() {
    this._auth.activateUser(this.UserData)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
        console.log("User Data From Db in Activation Code " + res)
        if (res) {
          let dbResponse: any = {};
          dbResponse = res.Value.Table[0];
          if (dbResponse.Message && dbResponse.CheckFlag == 1) {
            this._session.saveSessionData('UserData', dbResponse);
            this._notify.showDbSucess(dbResponse.Message)
            this.showSpinner = 0;
            this._route.navigateByUrl('/user')
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
  counterToSendAgain() {
    this.timeLeft = 60;

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        this.sendAgainFlag = 1;
      }

    }, 1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  dbResponse: any = {};
  sendActivationCode() {
    if (this.UserData.Mobile) {
      this.UserData.ConfirmationCode = String(Math.floor(Math.random() * 965418));
      this.sendAgainFlag = 0;
      this.counterToSendAgain();
      this._auth.resetUserPassword(this.UserData)
        .pipe(takeUntil(this.stream))
        .subscribe((res: any) => {
          console.log("User Data From Db in Resend ActivationCode " + res)
          if (res.Value.Table) {
            this.dbResponse = res.Value.Table[0];
            this.UserData = this.dbResponse
            this.localStore.saveSessionData('UserData', this.UserData);
            if (this.dbResponse.Serial && this.dbResponse.ConfirmationCode) {
              this.sendConfirmationCodeByEmail(this.dbResponse);
              this._notify.showDbSucess("WAITCONFIRMATIONCODE")
            }
            else if (this.dbResponse.Message && this.dbResponse.CheckFlag == 0) {
              this._notify.showDbError(this.dbResponse.Message)
            }
            else {
              this._notify.showDbError("ERROR")
            }
          }
          else {
            this._notify.showDbError("ERROR")

          }
        });

    }
    else {
      this._notify.showValidation("ENTERPHONENUMBER")
      return

    }
  }
  ngOnDestroy() {
    this.stream.next();
    this.stream.complete();
  }
}
