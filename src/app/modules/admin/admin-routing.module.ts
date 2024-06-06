import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { MainComponent } from '../main/component/main/main.component';
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '', component: MainComponent, children: [{ path: '', component: DashboardComponent }] }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
