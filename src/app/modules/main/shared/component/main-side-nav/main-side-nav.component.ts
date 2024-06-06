import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AboutusComponent } from 'src/app/shared/components/aboutus/aboutus.component';
import { ContactusComponent } from 'src/app/shared/components/contactus/contactus.component';
import { TermsAndConditionsComponent } from 'src/app/shared/components/terms-and-conditions/terms-and-conditions.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LocalService } from 'src/app/shared/services/local.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { iWejiCategories } from '../../interface/iWejiCategories';
import { iWejiClassifications } from '../../interface/iWejiClassifications';
import { WejiCategoriesAndClassificationsService } from '../../service/weji-categories-and-classifications.service';
import { SaveUserRequestComponent } from '../save-user-request/save-user-request.component';
import { sideNavToggle } from './nav-data';

@Component({
  selector: 'app-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  styleUrls: ['./main-side-nav.component.scss']
})
export class MainSideNavComponent implements OnInit, OnDestroy {
  collapsed: boolean = false;
  screenWidth: number = 0;
  wejiCategories: iWejiCategories[] = [];
  categoriesBufferArr: iWejiCategories[] = [];

  wejiClassifications: iWejiClassifications[] = [];
  wejiCategoriesObj: iWejiCategories = <iWejiCategories>{};
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  @Output() getCategoryByName: EventEmitter<string> = new EventEmitter();
  @Output() changAppLang: EventEmitter<string> = new EventEmitter();

  categoryName: string = 'حدد عايز اي';
  categoryClass: string = 'fa fa-sm fa-question';
  UserData: any = {};
  headerLang!: number;
  constructor(private _wejiCategoriesAndClassificationsService: WejiCategoriesAndClassificationsService,
    private localStore: LocalService, private _router: Router, private _notify: NotificationService,
    public translate: TranslateService, private modalService: BsModalService, private _auth: AuthenticationService
  ) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.getUserData();
    ///if Stored Before//////////////////
    this.getStoredData();
    ///search area//////Sidnav///
    this.searchOnData();
  }


  //////////get user data from login///////login status=1/////////
  getUserData() {
    // userData
    this.UserData = this.localStore.getSessionData('UserData');
    console.log("userdata from login", this.UserData)
  }
  ///////////if Cat And Class StoredBefore/////////////////////////////////
  getStoredData() {
    if (this.localStore.getSessionData('wejiCategories') && this.wejiCategories.length) {
      this.wejiCategories = this.localStore.getSessionData('wejiCategories');
      if (this.wejiCategories.length > 0) {
        this.filterCategoriesWithUserType(this.wejiCategories);
      }
    }
    /////////for First Time//or if error happens
    if (this.wejiCategories.length == 0) {
      ///////////////Get For First Time///////Azmio////////
      this.getWejiCategoriesAndClassifications(this.wejiCategoriesObj);
    }
  }
  ///////////Sidenav area//////////////////Load All Data///////////Azmio///22-10-2022///////////////////
  getWejiCategoriesAndClassifications(wejiCategoriesObj: iWejiCategories) {
    this._wejiCategoriesAndClassificationsService.getWejiCategoriesAndClassifications(wejiCategoriesObj)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res) {
          this.wejiCategories = res.Table;
          this.categoriesBufferArr = res.Table;
          this.filterCategoriesWithUserType(this.categoriesBufferArr);
          this.wejiClassifications = res.Table1;
          this.localStore.saveSessionData('wejiCategories', this.categoriesBufferArr);
          this.localStore.saveSessionData('wejiClassifications', this.wejiClassifications);
        }
      });
  }
  ////////////////////Filter Side Nav Login or logout user or admin//////////////Azmio//22-10-2022
  catFinalArr: iWejiCategories[] = [];
  filterCategoriesWithUserType(categoriesBufferArr: iWejiCategories[]) {
    /////////////////////Visitor---Log out///////
    if ((!this.UserData || this.UserData.length == 0) ||
      (this.UserData.LoginStatus == 0 || this.UserData.LoginStatus == undefined)) {
      this.wejiCategories = categoriesBufferArr.filter(e => e.UserType == 2 && e.IsLogged == 0);
    }
    // ---user is logged
    if (this.UserData.Serial && this.UserData.Mobile && this.UserData.UserType == 2 && this.UserData.LoginStatus == 1) {
      //logged=0 Or 1 and type =2
      this.wejiCategories = categoriesBufferArr.filter(e => e.UserType == 2);
    }
    //admin see all 
    if (this.UserData.Serial && this.UserData.Mobile && this.UserData.UserType == 1 && this.UserData.LoginStatus == 1) {
      //logged=0 Or 1 and type =2
      this.wejiCategories = categoriesBufferArr.filter(e => e.UserType == 2 || e.UserType == 1);
    }
    this.catFinalArr = this.wejiCategories;
  }
  ////////////////Sent To Classificationlist Comp/////////////////
  getCategoryName(categoryName: string, categoryClass: string, serial: number) {
    this.categoryName = categoryName
    this.categoryClass = categoryClass
    this.localStore.saveSessionData('categorySerial', serial);
  }
  //////////////Logout area///////////////////Azmio/22-10-2022////////
  logOutClicked() {
    this.UserData.LoginStatus = 0;
    this._auth.updateLoginStatus(this.UserData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res) {
          this.UserData = res.Value.Table[0];
          if (this.UserData.Serial) {
            this.localStore.saveSessionData('UserData', this.UserData);
            this.categoryName = '';
            this.categoryClass = '';
            if (this.UserData.LoginStatus == 0) {
              this.filterCategoriesWithUserType(this.wejiCategories);
              this._router.navigateByUrl('/main')
              this._notify.showDbWarn("LOGOUT")
            }
            else {
              this._notify.showDbError("ERROR")
            }
          }
        }
      });
  }
  ////////////lang area////////////////Azmio///////22-10-2022/////////////
  toggleBtn: boolean = true;
  langBtnClicked() {
    this.toggleBtn = !this.toggleBtn
    if (this.toggleBtn == true) {
      this.changAppLang.emit('ar')
    } else {
      this.changAppLang.emit('en')

    }
  }
  ////////search Area////////////////////
  searchInputControl = new FormControl();
  searchOnData() {
    this.searchInputControl.valueChanges.subscribe(x => {
      debounceTime(100);
      this.searchOnDataList(x);

    })
  }
  searchOnDataList(value: string) {
    let exp = /^[A-Za-z][A-Za-z0-9_ ]*$/;
    if (value && value.length > 0) {
      this.wejiCategories = [];
      if (exp.test(value) || value == '') {
        this.wejiCategories = this.catFinalArr.filter(s => {
          s['NameAr'].includes(value)
        });

      }
      if (exp.test(value) || value == '') {
        this.wejiCategories = this.catFinalArr.filter(s => {
          s['NameEn'].includes(value)
        });

      }
      else {
        if (isNaN(+value)) {
          this.wejiCategories = this.catFinalArr.filter(s => s['NameAr'].includes(value)

          );

        } else {
          this.wejiCategories = this.catFinalArr.filter(s => s['Serial'] == +value);
        }
      }
    }
    if (value.length == 0) {
      this.wejiCategories = this.catFinalArr;
    }
  }
  ///////////////////////////////header Menue Area///////Azmio//22-10-2022///////////////
  modalRef!: BsModalRef;
  openModal() {
    const initialState: any = {
      classificationSerial: 10,
      nameAr: 'عام',
      nameEn: 'General Request'
    }
    this.modalRef = this.modalService.show(SaveUserRequestComponent, { initialState });
  }
  wejiCooAction(type: string) {
    if (type == "Contact") {
      const initialState: any = {
        Mobile: this.UserData.Mobile,
        Serial: this.UserData.Serial
      }
      this.modalRef = this.modalService.show(ContactusComponent, { initialState });
    }
    else if (type == "About") {
      this.modalRef = this.modalService.show(AboutusComponent);
    }
    else if (type == "Terms") {
      this.modalRef = this.modalService.show(TermsAndConditionsComponent);
    }
  }
  toggleCollapse(e: any) {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
  closeSideNav(e: any) {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })

  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}


