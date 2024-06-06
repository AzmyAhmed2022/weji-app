import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import { iWejiCategories } from '../../interface/iWejiCategories';
import { SaveUserRequestService, userRequest } from '../../service/save-user-request.service';

@Component({
  selector: 'app-user-request-list',
  templateUrl: './user-request-list.component.html',
  styleUrls: ['./user-request-list.component.scss']
})
export class UserRequestListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  CatObj: iWejiCategories = <iWejiCategories>{};
  // = [{
  //   Serial: 1234, ClassAr: 'بقالة', ClassEn: 'Beqal', Date: '2022-10-26',
  //   StatusAr: 'وصل', StatusEn: 'Arrive', Price: 200,Detail:'10 علبة نسكافية'
  // }];
  UserRequestArr: any = [];
  InitialState: any;
  constructor(public modalRef: BsModalRef, public modalService: BsModalService, private _userRequest: SaveUserRequestService, public translate: TranslateService) {
    this.InitialState = modalService.config.initialState
    console.log('InitialState From Dashboard is =' + this.InitialState)
    if (this.InitialState) {
      this.CatObj = this.InitialState.Cat;
      this.UserRequestArr = this.InitialState.UserRequests;
    }

  }

  ngOnInit(): void {
  }
  updateRequestArrivalStatus(request: any) {

    this._userRequest.updateRequestArrivalStatus(request).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((c:any )=> {
        let resData: any = c.Value.Table[0];
if(resData)
  this.UserRequestArr.forEach((element:any) => {
    element.ArrivalStatus=resData.ArrivalStatus
    element.OrderStatusAr=resData.OrderStatusAr
    element.OrderStatusEn=resData.OrderStatusEn

    
  });

      }

      );



  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
