import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainSideNavComponent } from './shared/component/main-side-nav/main-side-nav.component';
import { MainBodyComponent } from './shared/component/main-body/main-body.component';
import { MainComponent } from './component/main/main.component';
import { ClassificationListComponent } from './shared/component/classification-list/classification-list.component';
import { SaveUserRequestComponent } from './shared/component/save-user-request/save-user-request.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { TermsAndConditionsComponent } from 'src/app/shared/components/terms-and-conditions/terms-and-conditions.component';
import { AboutusComponent } from 'src/app/shared/components/aboutus/aboutus.component';
import { ContactusComponent } from 'src/app/shared/components/contactus/contactus.component';
import { UserRequestListComponent } from './shared/component/user-request-list/user-request-list.component';
import { DentalChartComponent } from './shared/component/dental-chart/dental-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { DragFilesComponent } from './shared/component/drag-files/drag-files.component';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [
    MainSideNavComponent,
    MainBodyComponent,
    MainComponent,
    ClassificationListComponent,
    SaveUserRequestComponent,
    TermsAndConditionsComponent,
    AboutusComponent,
    ContactusComponent,
    UserRequestListComponent,
    DentalChartComponent,
    DragFilesComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatIconModule,
    CKEditorModule
  ],
  exports: [MainSideNavComponent,
    MainBodyComponent,
    MainComponent,
    UserRequestListComponent
  ]
})
export class MainModule { }
