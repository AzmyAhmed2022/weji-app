import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ActivationCodeComponent } from 'src/app/shared/components/activation-code/activation-code.component';
import { ForgetPasswordComponent } from 'src/app/shared/components/forget-password/forget-password.component';
import { LandingPageComponent } from 'src/app/shared/components/landing-page/landing-page.component';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { SignupComponent } from 'src/app/shared/components/signup/signup.component';
import { MainComponent } from './component/main/main.component';
import { ClassificationListComponent } from './shared/component/classification-list/classification-list.component';
import { DentalChartComponent } from './shared/component/dental-chart/dental-chart.component';
import { DragFilesComponent } from './shared/component/drag-files/drag-files.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: '', component: MainComponent, children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'activation-code', component: ActivationCodeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transportation', component: ClassificationListComponent },
      { path: 'shipping-items', component: ClassificationListComponent },
      { path: 'financial-dealings', component: ClassificationListComponent },
      { path: 'personal-occasions', component: ClassificationListComponent },
      { path: 'reservations', component: ClassificationListComponent },
      { path: 'software', component: ClassificationListComponent },
      { path: 'weji-products', component: ClassificationListComponent },
      { path: 'user-needs', component: ClassificationListComponent },
      { path: 'dental-chart', component: DentalChartComponent },
      { path: 'drag-files', component: DragFilesComponent }


    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
