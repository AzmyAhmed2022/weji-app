import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './shared/services/notification.service';
import { MainModule } from './modules/main/main.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/services/httperrorinterceptor.service';
import { SharedModule } from './shared/modules/shared/shared.module';
import { LoginComponent } from './shared/components/login/login.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExceptionService } from './shared/services/exception.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivationCodeComponent } from './shared/components/activation-code/activation-code.component';
import { ForgetPasswordComponent } from './shared/components/forget-password/forget-password.component';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { GeneralService } from './shared/services/general.service';
import { ToastService } from './shared/services/toast.service';
import { SpinnerService } from './shared/services/spinner.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// --
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ActivationCodeComponent,
    ForgetPasswordComponent,
    LandingPageComponent,
    DashboardComponent,
    SpinnerComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 6000, // 15 seconds
      closeButton: true,
      progressBar: true,
      preventDuplicates: true
    }),
    MainModule,
    UserModule,
    AdminModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  [exports]: [],
  providers: [
    BsModalService, ExceptionService,
    NotificationService, GeneralService, NgxSpinnerService,
    ExceptionService, TranslateService, ToastService,SpinnerService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
