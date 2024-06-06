import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit,OnDestroy {
  private stream: Subject<void> = new Subject<void>();
  initialState: any;

  constructor(public translate: TranslateService ,public modalRef: BsModalRef, public modalService: BsModalService) { 
    this.initialState = modalService.config.initialState

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.stream.next();
    this.stream.complete();
  }
}
