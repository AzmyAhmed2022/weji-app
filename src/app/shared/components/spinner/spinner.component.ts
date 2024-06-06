import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpinnerState, SpinnerService } from '../../services/spinner.service';

const ACTIVE_CLASS = 'is-active';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnDestroy, OnInit {
  visible = false;
  showSpinner = false;
  _spinnerStateChanged!: Subscription;

  constructor(private _spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.init();
  }

  init() {

    this._spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }



  ngOnDestroy() {
    this._spinnerStateChanged.unsubscribe();
  }
}