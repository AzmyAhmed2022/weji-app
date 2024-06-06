import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LocalService } from '../../services/local.service';
import { NotificationService } from '../../services/notification.service';
//Jwt
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  UserLoginForm!: FormGroup;
  submitted = false;
  LoginObj: any = { Mobile: '', Password: '', RememberMe: false };
  UserData: any = {};
  showSpinner: number = 0
  private stream: Subject<void> = new Subject<void>();
  constructor(private _session: LocalService,
    public translate: TranslateService,
    private _auth: AuthenticationService,
    private _fb: FormBuilder,
    private _router: Router,
    private _notify: NotificationService) { }

  ngOnInit(): void {
    this.creatForm()

  }
  get f(): { [key: string]: AbstractControl } {
    return this.UserLoginForm.controls;
  }
  creatForm() {
    this.UserLoginForm = this._fb.group({
      Mobile: ['0', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')
      ]],
      Password: ['',
        Validators.required],
      RememberMe: [false]
    });
  }
  login() {
    this.submitted = true;
    this.showSpinner == 1;

    if (this.UserLoginForm.invalid) {
      return;
    }
    this.LoginObj = {};
    this.LoginObj = this.UserLoginForm.value;
    if (!this.LoginObj.Mobile || this.LoginObj.Mobile == '0') {
      this._notify.showValidation("ENTERPHONENUMBER");

      return
    }
    if (!this.LoginObj.Password || this.LoginObj.Password == '') {
      this._notify.showValidation("ENTERPASSWORD");

      return
    }
    this.getUserData();
  }
  dbResponse: any = {};
  getUserData() {
    ///jwt  user check 
    this._auth.getUseByMobile(this.LoginObj)
      .pipe(takeUntil(this.stream))
      .subscribe((res: any) => {
        console.log("User Data From Db in Login" + res)
        if (res.Value.Table) {
          this.dbResponse = res.Value.Table[0];
          this.showSpinner = 0
          if (this.dbResponse.Serial) {
            this.UserData = this.dbResponse;
            this.checkUserData();
          }
          else if (this.dbResponse.Message || this.dbResponse.CheckFlag == 0) {
            this._notify.showDbError("USERNOTEXISTS")

            return
          }
          else {
            this._notify.showDbError("ERROR")

            return
          }
        }
        else {
          this._notify.showDbError("ERROR");

          return

        }
      });

  }
  checkUserData() {
    if (this.dbResponse.Serial && this.UserData.Serial) {
      if (!this.UserData.Mobile) {
        this._notify.showValidation("USERNOTEXISTS");

        return
      }
      if (this.LoginObj.Mobile != this.UserData.Mobile) {
        this._notify.showDbError("USERNOTEXISTS");

        return
      }
      if (this.LoginObj.Password != this.UserData.Password) {
        this._notify.showDbError("WRONGPASSWORD");

        return

      }

      if (this.UserData.Serial && this.LoginObj.Mobile == this.UserData.Mobile
        && this.LoginObj.Password == this.UserData.Password
      ) {
        this._session.saveSessionData('UserData', this.UserData);

        if (this.UserData.UserType == 1) {

          this._router.navigateByUrl('/admin')
          this._notify.showValidationSucess("ADMINLOGIN")

        }
        else if (this.UserData.UserType == 2) {

          this._router.navigateByUrl('/user')
          this._notify.showValidationSucess("USERLOGIN")

        }
      }
      else {
        this._notify.showDbError("ERROR")

        return

      }
    }
  }
  ngOnDestroy(): void {
    this.stream.next();
    this.stream.complete();
  }
}
