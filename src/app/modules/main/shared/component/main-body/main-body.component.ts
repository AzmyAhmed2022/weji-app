import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;
  isLoad: number = 1;


  constructor(public _spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
    this._spinnerService.show()

    setTimeout(() => {
      this._spinnerService.hide()
    }, 1000)  }
  getBodyClass() {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }
    else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'

    }
    return styleClass;
  }
}
