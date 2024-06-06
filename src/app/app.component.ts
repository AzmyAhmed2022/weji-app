import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { sideNavToggle } from './modules/main/shared/component/main-side-nav/nav-data';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'weji-website';
  private stream: Subject<void> = new Subject<void>();
  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;
  categoryName: string = '';
  public appDir: string = '';
  constructor(public translate: TranslateService  ) {
    translate.addLangs(['ar', 'en']);
    translate.use('ar');
    if (translate.currentLang == 'ar') {
      this.appDir = 'rtl';
    }
    else {
      this.appDir = 'ltr';

    }
  }
  isLoad: number = 1;
  ngOnInit() {


  }



  onToggleSideNav(data: sideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  getCategoryName(categoryName: any) {
    this.categoryName = categoryName;
  }
  ngOnDestroy(): void {
    this.stream.next();
    this.stream.complete();
  }

}
