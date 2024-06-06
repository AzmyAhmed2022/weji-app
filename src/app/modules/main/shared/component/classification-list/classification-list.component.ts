import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime, Observable, Subject } from 'rxjs';
import { LocalService } from 'src/app/shared/services/local.service';
import { iWejiClassifications } from '../../interface/iWejiClassifications';
import { SaveUserRequestComponent } from '../save-user-request/save-user-request.component';
@Component({
  selector: 'app-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.scss']
})
export class ClassificationListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  modalRef!: BsModalRef;
  searchControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<iWejiClassifications[]>;
  searchInputControl = new FormControl();
  searchLinkList: iWejiClassifications[] = [];
  wejiClassifications: iWejiClassifications[] = [];
  categorySerial!: number;
  constructor(private localStore: LocalService,
    private modalService: BsModalService, private _fb: FormBuilder, public translate: TranslateService
  ) {
    this.categorySerial = this.localStore.getSessionData('categorySerial');
    console.log("categorySerial Seesion on MainSideNavComponent :" + this.categorySerial)

  }

  ngOnInit(): void {
    this.getClassificationsList();
    this.searchOnData();

  }
  searchOnData() {
    this.searchInputControl.valueChanges.subscribe(x => {
      debounceTime(100);
      this.searchOnDataList(x);

    })
  }
  searchOnDataList(value: string) {
    let exp = /^[A-Za-z][A-Za-z0-9_ ]*$/;
    if (value && value.length > 0) {
      this.wejiClassifications = [];
      if (exp.test(value) || value == '') {
        this.wejiClassifications = this.searchLinkList.filter(s => {
          s['NameAr'].includes(value)
        });

      }
      else {
        if (isNaN(+value)) {
          this.wejiClassifications = this.searchLinkList.filter(s => s['NameAr'].includes(value));

        } else {
          this.wejiClassifications = this.searchLinkList.filter(s => s['Serial'] == +value);
        }
      }
    }
    if (value.length == 0) {
      this.wejiClassifications = this.searchLinkList;
    }
  }
  catObj: any = {};
  getClassificationsList() {
    this.wejiClassifications = this.localStore.getSessionData('wejiClassifications');
    if (this.wejiClassifications.length > 0) {
      this.wejiClassifications = this.wejiClassifications.filter(ele => ele.CategorySerial == this.categorySerial);
      this.searchLinkList = this.wejiClassifications;
      this.catObj = this.wejiClassifications[0];


    }
  }
  openModal(item: any) {
    const initialState: any = {
      classificationSerial: item.Serial,
      nameAr: item.NameAr
    }
    this.modalRef = this.modalService.show(SaveUserRequestComponent, { initialState });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
