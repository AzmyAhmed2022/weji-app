import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { sideNavToggle } from '../../shared/component/main-side-nav/nav-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private stream: Subject<void> = new Subject<void>();
  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;
  categoryName: string = '';
  appDir: string = "rtl";
  constructor(public translate: TranslateService,
  ) {
    if (translate.currentLang == 'ar') {
      this.appDir = 'rtl'
    }
    else if (translate.currentLang == 'en') {
      this.appDir = 'ltr'
    }
    else {
      this.appDir = 'rtl'

    }
  }
  ngOnInit() {

  }
  onToggleSideNav(data: sideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  getCategoryName(categoryName: any) {
    this.categoryName = categoryName;
  }
  changAppLang(lang: any) {
    if (lang == 'ar') {
      this.translate.use('ar')
      this.appDir = 'rtl'
    }
    else if (lang == 'en') {
      this.translate.use('en')
      this.appDir = 'ltr'
    }

  }

  ngOnDestroy(): void {
    this.stream.next();
    this.stream.complete();
  }

}
