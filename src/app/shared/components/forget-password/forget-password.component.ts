import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LocalService } from '../../services/local.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  UserResetPasswordForm!: FormGroup;
  resetPasswordObj: any = {};
  mobRegex = '^01[0-2,5]{1}[0-9]{8}$'
  passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  submitted = false;
  showSpinner: number = 0

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _route: Router,
    private _fb: FormBuilder, private _auth: AuthenticationService,
    public _session: LocalService,
    public translate: TranslateService, private _notify: NotificationService) { }

  ngOnInit(): void {
    this.creatForm()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.UserResetPasswordForm.controls;
  }
  creatForm() {
    this.UserResetPasswordForm = this._fb.group({
      Mobile: [0, [Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern(this.mobRegex)]
      ],
      ConfirmationCode: ['', Validators.required],
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        Validators.pattern(this.passRegex)

      ]],
      ConfirmPassword: ['', Validators.required]



    });
  }
  changeUserPassword() {
    this._notify.showSuccess("جاري تغيير كلمة السر", "كلمة السر")

    this._router.navigateByUrl('/main/login')
  }

  resetUserPassword() {
    this.resetPasswordObj = this.UserResetPasswordForm.value;

    this.submitted = true;
    this.showSpinner = 1;

    if (this.UserResetPasswordForm.invalid) {
      return;
    }


    if (this.resetPasswordObj.Mobile == '0' || !this.resetPasswordObj.Mobile) {
      this._notify.showValidation("ENTERPHONENUMBER")
      return
    }
    if (this.resetPasswordObj.ConfirmationCode == '') {
      this._notify.showValidation("ENTERCONFIRMATIONCODE");
      return
    }
    if (this.dbResponse && this.dbResponse.ConfirmationCode > 0) {
      if (+this.dbResponse.ConfirmationCode != this.resetPasswordObj.ConfirmationCode) {
        this._notify.showValidation("CONFRMATIONCODENOTMATCH");
        return
      }
    }
    if (!this.resetPasswordObj.Password || this.resetPasswordObj.Password == '') {
      this._notify.showValidation("ENTERPASSWORD");
      return
    }
    if (!this.resetPasswordObj.ConfirmPassword || this.resetPasswordObj.ConfirmPassword == '') {
      this._notify.showValidation("CONFIRMPASSWORD");
      return
    }
    if (this.resetPasswordObj.ConfirmPassword !== this.resetPasswordObj.Password) {
      this._notify.showValidation("PASSWORDNOTMATCH");
      return
    }

    ////////all form is fine //////////////// update password
    this.setNewPassword();

  }

  setNewPassword() {
    this.resetPasswordObj.Serial = this.dbResponse.Serial;
    this._auth.resetUserPassword(this.resetPasswordObj)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        console.log("User Data From Db in ForgetPassword" + res)
        if (res.Value.Table) {
          this.dbResponse = res.Value.Table[0];
          if (this.dbResponse.Serial && this.dbResponse.ConfirmationCode) {
            this._session.saveSessionData('UserData', this.dbResponse);
            this._notify.showDbSucess("PASSWORDRESET")
            this.showSpinner = 0;

            this._router.navigateByUrl('/user')

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
  timeLeft: number = 60;
  interval: any;
  sendAgainFlag: number = 1;
  counterToSendAgain() {
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
    this.resetPasswordObj = this.UserResetPasswordForm.value;
    this.submitted = true;
    this.showSpinner = 1;

    if (this.UserResetPasswordForm.invalid && (this.resetPasswordObj.Mobile == '0' || !this.resetPasswordObj.Mobile)) {
      return;
    }
    if (this.resetPasswordObj.Mobile) {
      this.resetPasswordObj.ConfirmationCode = String(Math.floor(Math.random() * 965418));
      this._auth.resetUserPassword(this.resetPasswordObj)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          console.log("User Data From Db in Forget Password " + res)
          if (res.Value.Table) {
            this.dbResponse = res.Value.Table[0];
            if (this.dbResponse.Serial && this.dbResponse.ConfirmationCode) {
              this._notify.showDbWarn("WAITCONFIRMATIONCODE")
              this.sendConfirmationCodeByEmail(this.dbResponse);
              this.sendAgainFlag = 0;
              this.showSpinner = 0;

              this.counterToSendAgain();
              // this.sendConfirmationCodeByMobile(this.dbResponse);
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

  sendConfirmationCodeByEmail(dbResponse: any) {
    this._auth.SendConfirmationCodeByMailFromSetting(dbResponse)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {

      });
  }
  sendConfirmationCodeByMobile(dbResponse: any) {
    this._auth.SendConfirmationCodeByPhoneFromSetting(dbResponse)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {

      });
  }
}
