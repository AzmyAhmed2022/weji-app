import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, query, group } from '@angular/animations';
import { SpinnerService } from '../spinner';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
  // animations: [
  //   trigger('fade', [
  //     transition('void => *', [
  //       style({ opacity: 0 }),
  //       animate('2000', style({ opacity: 1 }))
  //     ])
  //   ])
  // ]



})

export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
function style(arg0: { opacity: number; }): any {
  throw new Error('Function not implemented.');
}

function animate(arg0: string, arg1: any): any {
  throw new Error('Function not implemented.');
}

