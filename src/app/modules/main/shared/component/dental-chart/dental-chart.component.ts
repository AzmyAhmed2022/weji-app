import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-dental-chart',
  templateUrl: './dental-chart.component.html',
  styleUrls: ['./dental-chart.component.css']
})
export class DentalChartComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  markArr: any[] = [];
  teethCheckedArr: any[] = [];
  markClickedArr: any[] = [];
  toothNo!: number;
  visitSerial: number = 123;
  searchToothInput = new FormControl();
  searchMarkInput = new FormControl();
  @Input() myProfileTap: any;
  checkAllFlag!: boolean;
  constructor(
    public translate: TranslateService, private _toast: NotificationService, private http: HttpClient

  ) {
    this.getJSON().subscribe((data: any) => {
      console.log("markArr : " + data);
      this.markArr = data;
    });
  }
  ///////////////##########Azmio///22-06-2022//////////////
  ngOnInit() {
    if (this.myProfileTap == undefined) {
      this.myProfileTap = {};
      this.myProfileTap.viewOnlyFlag = false;

    }
    this.creatpsearch();
    this.createClickedToothSearch();
    if (this.visitSerial) {
      this.createTeethArr();
    }
    else {
      this._toast.showDbError('Visit Serial Not Exists');
    }


  }
  public getJSON(): Observable<any> {
    return this.http.get("/assets/jsonFiles/tables/mark-stp.json");
  }
  //permanent
  toothChartType: number = 2;
  changeToothChartType(e: any) {
    this.toothChartType = e.target.value
    console.log(this.toothChartType + '=' + e.target.value);
  }




  checkAllTeeth() {
    if (this.checkAllFlag == true) {
      this.teethCheckedArr.forEach(el => {
        el.checked = true
      })
    }
    else {
      this.teethCheckedArr.forEach(el => {
        el.checked = false
      })
    }
  }
  checkTooth(ev: any, e: any) {
    for (let i = 0; i < this.teethCheckedArr.length; i++) {
      if (ev.target.checked && this.teethCheckedArr[i]['toothNo'] == e) {
        this.teethCheckedArr[i]['checked'] = true;
      }
      else if (!ev.target.checked && this.teethCheckedArr[i]['toothNo'] == e) {
        this.teethCheckedArr[i]['checked'] = false;
        this.teethCheckedArr[i]['crownSerial'] = null;
        this.teethCheckedArr[i]['bracesesSerial'] = null;
        this.teethCheckedArr[i]['veneerSerial'] = null;
        this.teethCheckedArr[i]['maskSerial'] = null;
        this.teethCheckedArr[i]['implantSerial'] = null;
        this.teethCheckedArr[i]['fiberSerial'] = null;
        this.teethCheckedArr[i]['extractionSerial'] = null;
        this.teethCheckedArr[i]['bridgeSerial'] = null;
        this.teethCheckedArr[i]['fillContainersSerial'] = null;
        this.teethCheckedArr[i]['fillInsideSerial'] = null;
        this.teethCheckedArr[i]['profileSerial'] = null;
        this.teethCheckedArr[i]['fillProfileSerial'] = null;
        this.teethCheckedArr[i]['cariesGeneralSerial'] = null;
        this.teethCheckedArr[i]['cariesRecurrentSerial'] = null;
        this.teethCheckedArr[i]['cariesRootSerial'] = null;
        this.teethCheckedArr[i]['cosmeticProblemSerial'] = null;
        this.teethCheckedArr[i]['crackedFillingSerial'] = null;
        this.teethCheckedArr[i]['crackedToothSerial'] = null;
        this.teethCheckedArr[i]['diastemaSerial'] = null;
        this.teethCheckedArr[i]['enamelDefectSerial'] = null;
        this.teethCheckedArr[i]['microLeakageSerial'] = null;
        this.teethCheckedArr[i]['paRadiolucencySerial'] = null;
        this.teethCheckedArr[i]['perioDontitsSerial'] = null;
        this.teethCheckedArr[i]['painSerial'] = null;
        this.teethCheckedArr[i]['bleedingSerial'] = null;
        this.teethCheckedArr[i]['mobilitySerial'] = null;
        this.teethCheckedArr[i]['recessionSerial'] = null;
        this.teethCheckedArr[i]['sensetivitySerial'] = null;
        this.teethCheckedArr[i]['brokenToothSerial'] = null;
        this.teethCheckedArr[i]['badOdorSerial'] = null;
        this.teethCheckedArr[i]['furcationInvationSerial'] = null;
        this.teethCheckedArr[i]['stainingSerial'] = null;
        this.teethCheckedArr[i]['inflammtionSerial'] = null;
        this.teethCheckedArr[i]['swellingSerial'] = null;
        this.teethCheckedArr[i]['caluluSerial'] = null;
        this.teethCheckedArr[i]['disColorationSerial'] = null;
        this.teethCheckedArr[i]['rctSerial'] = null;
        this.teethCheckedArr[i]['amalGamrestSerial'] = null;
        this.teethCheckedArr[i]['compositeRestSerial'] = null;
        this.teethCheckedArr[i]['classiSerial'] = null;
        this.teethCheckedArr[i]['othersSerial'] = null;
        this.teethCheckedArr[i]['fractureSerial'] = null;
        this.teethCheckedArr[i]['rootCanalSerial'] = null;
        this.teethCheckedArr[i]['missingToothSerial'] = null;
        this.teethCheckedArr[i]['classIIISerial'] = null;
        this.teethCheckedArr[i]['classVSerial'] = null;
        this.teethCheckedArr[i]['bracketsSerial'] = null;
        this.teethCheckedArr[i]['spaceMaintainerSerial'] = null;
        this.teethCheckedArr[i]['restorationSerial'] = null;
        this.teethCheckedArr[i]['abcessSerial'] = null;
        this.teethCheckedArr[i]['classiiSerial'] = null;
        this.teethCheckedArr[i]['impactedToothSerial'] = null;

      }
    }
    console.log("teethCheckedArr :" + this.teethCheckedArr)
  }

  onLegendChange(item: any) {
    // لو ضغط على سنه على الاقل
    let toothChecked: number;
    toothChecked = this.teethCheckedArr.find(ob => ob.checked === true);
    ////////////////////////////////////////////
    if (toothChecked) {
      this.checkAllFlag = false;
      for (let i = 0; i < this.teethCheckedArr.length; i++) {
        if (this.teethCheckedArr[i]['checked'] == true) {

          this.markClickedArr.push(
            {
              serial: (this.markClickedArr.length + 1) * -1, markSerial: item.serial, nameAr: item.nameAr, nameEn: item.nameEn, id: item.id,
              toothNo: this.teethCheckedArr[i].toothNo, visitSerial: this.visitSerial,
              iconSrc: item.iconSrc, toothChartType: this.toothChartType,
              toothChartTypeDesc: this.toothChartType == 2 ? this.teethCheckedArr[i].toothNo : this.toothChartType == 1 ? this.teethCheckedArr[i].primaryTeeth : this.teethCheckedArr[i].mixedTeeth

            });
        }
        this.searchOnAllClickedMarks = this.markClickedArr;

        if (item.serial == 1 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['crownSerial'] = item.id + this.teethCheckedArr[i].toothNo
        }
        else if (item.serial == 2 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['bracesesSerial'] = item.id + this.teethCheckedArr[i].toothNo
        }
        else if (item.serial == 3 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['veneerSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 4 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['maskSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 5 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['implantSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 6 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['fiberSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 7 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['extractionSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 8 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['bridgeSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 9 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['fillContainersSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 10 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['fillInsideSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 11 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['profileSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 12 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['fillProfileSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 13 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['cariesGeneralSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 14 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['cariesRecurrentSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 15 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['cariesRootSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 16 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['cosmeticProblemSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 17 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['crackedFillingSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 18 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['crackedToothSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 19 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['diastemaSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 20 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['enamelDefectSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 21 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['microLeakageSerial'] = item.id + this.teethCheckedArr[i].toothNo;


        }
        else if (item.serial == 22 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['paRadiolucencySerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 23 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['perioDontitsSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 24 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['painSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 25 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['bleedingSerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 26 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['mobilitySerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 27 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['recessionSerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 28 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['sensetivitySerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 29 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['brokenToothSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 30 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['badOdorSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 31 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['furcationInvationSerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 32 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['stainingSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 33 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['inflammtionSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 34 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['swellingSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 35 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['calulusSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 36 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['disColorationSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 37 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['rctSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 38 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['amalGamrestSerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 39 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['compositeRestSerial'] = item.id + this.teethCheckedArr[i].toothNo;

        }
        else if (item.serial == 40 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['classiSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 41 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['telTedSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 42 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['othersSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 43 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['goldenCrownSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 44 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['fractureSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 45 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['rootCanalSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 46 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['missingToothSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 47 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['classIIISerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 48 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['classVSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 49 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['bracketsSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 50 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['spaceMaintainerSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }

        else if (item.serial == 51 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['restorationSerial'] = item.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (item.serial == 52 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['abcessSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }
        else if (item.serial == 53 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['classiiSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }

        else if (item.serial == 54 && this.teethCheckedArr[i]['checked'] == true) {
          this.teethCheckedArr[i]['impactedToothSerial'] = item.id + this.teethCheckedArr[i].toothNo;
        }






        // يخش على السنه اللى اخترها بعد كده
        this.teethCheckedArr[i]['checked'] = false;
      }

      console.log("teethCheckedArr:" + this.teethCheckedArr)
    }
    else {
      this._toast.showDbError("please Choose Tooth First")
    }

  }
  onLegendRemove(item: any) {
    if (item.serial) {
      item.rowStatus = -1;
      //let index = this.markClickedArr.findIndex((element) => element['markSerial'] == item.markSerial && element['toothNo'] == item.toothNo);
      // this.markClickedArr.splice(index, 1);
      this.checkTeethRemoveClasses(item.markSerial, item.toothNo);
    }
  }
  onToothChartClear(e: any) {
    for (let i = 0; i < this.markClickedArr.length; i++) {
      this.markClickedArr[i]['rowStatus'] = -1
      this.checkTeethRemoveClasses(this.markClickedArr[i]['markSerial'], this.markClickedArr[i]['toothNo']);

    }
  }
  checkTeethRemoveClasses(markSerial: number, toothNo: number) {
    for (let i = 0; i < this.teethCheckedArr.length; i++) {
      if (markSerial == 1 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['crownSerial'] = null
      }
      else if (markSerial == 2 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['bracesesSerial'] = null
      }
      else if (markSerial == 3 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['veneerSerial'] = null
      }
      else if (markSerial == 4 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['maskSerial'] = null;
      }
      else if (markSerial == 5 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['implantSerial'] = null;
      }
      else if (markSerial == 6 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['fiberSerial'] = null;
      }
      else if (markSerial == 7 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['extractionSerial'] = null;
      }
      else if (markSerial == 8 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['bridgeSerial'] = null;
      }
      else if (markSerial == 9 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['fillContainersSerial'] = null
      }
      else if (markSerial == 10 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['fillInsideSerial'] = null;
      }
      else if (markSerial == 11 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['profileSerial'] = null;
      }
      else if (markSerial == 12 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['fillProfileSerial'] = null;
      }
      else if (markSerial == 13 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['cariesGeneralSerial'] = null;
      }
      else if (markSerial == 14 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['cariesRecurrentSerial'] = null;
      }
      else if (markSerial == 15 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['cariesRootSerial'] = null;
      }
      else if (markSerial == 16 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['cosmeticProblemSerial'] = null;
      }
      else if (markSerial == 17 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['crackedFillingSerial'] = null;
      }
      else if (markSerial == 18 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['crackedToothSerial'] = null;
      }
      else if (markSerial == 19 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['diastemaSerial'] = null;
      }
      else if (markSerial == 20 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['enamelDefectSerial'] = null;
      }
      else if (markSerial == 21 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['microLeakageSerial'] = null;


      }
      else if (markSerial == 22 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['paRadiolucencySerial'] = null;

      }
      else if (markSerial == 23 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['perioDontitsSerial'] = null;
      }
      else if (markSerial == 24 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['painSerial'] = null;
      }
      else if (markSerial == 25 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['bleedingSerial'] = null;

      }
      else if (markSerial == 26 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['mobilitySerial'] = null;

      }
      else if (markSerial == 27 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['recessionSerial'] = null;

      }
      else if (markSerial == 28 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['sensetivitySerial'] = null;

      }
      else if (markSerial == 29 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['brokenToothSerial'] = null;
      }
      else if (markSerial == 30 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['badOdorSerial'] = null;
      }
      else if (markSerial == 31 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['furcationInvationSerial'] = null;

      }
      else if (markSerial == 32 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['stainingSerial'] = null;
      }
      else if (markSerial == 33 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['inflammtionSerial'] = null;
      }
      else if (markSerial == 34 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['swellingSerial'] = null;
      }
      else if (markSerial == 35 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['caluluSerial'] = null;
      }
      else if (markSerial == 36 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['disColorationSerial'] = null;
      }
      else if (markSerial == 37 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['rctSerial'] = null;
      }
      else if (markSerial == 38 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['amalGamrestSerial'] = null;

      }
      else if (markSerial == 39 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['compositeRestSerial'] = null;

      }
      else if (markSerial == 40 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['classiSerial'] = null;
      }
      else if (markSerial == 41 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['telTedSerial'] = null;
      }
      else if (markSerial == 42 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['othersSerial'] = null;
      }
      else if (markSerial == 43 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['goldenCrownSerial'] = null;
      }
      else if (markSerial == 44 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['fractureSerial'] = null;
      }
      else if (markSerial == 45 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['rootCanalSerial'] = null;
      }
      else if (markSerial == 46 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['missingToothSerial'] = null;
      }
      else if (markSerial == 47 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['classIIISerial'] = null;
      }
      else if (markSerial == 48 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['classVSerial'] = null;
      }
      else if (markSerial == 49 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['bracketsSerial'] = null;
      }
      else if (markSerial == 50 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['spaceMaintainerSerial'] = null;
      }
      else if (markSerial == 51 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['restorationSerial'] = null;
      }
      else if (markSerial == 52 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['abcessSerial'] = null;
      }
      else if (markSerial == 53 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['classiiSerial'] = null;
      }
      else if (markSerial == 54 && toothNo == this.teethCheckedArr[i]['toothNo']) {
        this.teethCheckedArr[i]['impactedToothSerial'] = null;
      }
    }

  }

  createTeethArr() {
    this.teethCheckedArr.push(
      { "toothNo": 18, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 17, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 16, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 15, "primaryTeeth": "A", "mixedTeeth": "A-15" },
      { "toothNo": 14, "primaryTeeth": "B", "mixedTeeth": "B-14" },
      { "toothNo": 13, "primaryTeeth": "C", "mixedTeeth": "C-13" },
      { "toothNo": 12, "primaryTeeth": "D", "mixedTeeth": "D-12" },
      { "toothNo": 11, "primaryTeeth": "E", "mixedTeeth": "E-11" },
      { "toothNo": 21, "primaryTeeth": "F", "mixedTeeth": "F-21" },
      { "toothNo": 22, "primaryTeeth": "G", "mixedTeeth": "G-22" },
      { "toothNo": 23, "primaryTeeth": "H", "mixedTeeth": "H-23" },
      { "toothNo": 24, "primaryTeeth": "I", "mixedTeeth": "I-24" },
      { "toothNo": 25, "primaryTeeth": "J", "mixedTeeth": "J-25" },
      { "toothNo": 26, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 27, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 28, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 38, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 37, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 36, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 35, "primaryTeeth": "K", "mixedTeeth": "K-35" },
      { "toothNo": 34, "primaryTeeth": "L", "mixedTeeth": "L-34" },
      { "toothNo": 33, "primaryTeeth": "M", "mixedTeeth": "M-33" },
      { "toothNo": 32, "primaryTeeth": "N", "mixedTeeth": "N-32" },
      { "toothNo": 31, "primaryTeeth": "O", "mixedTeeth": "O-31" },
      { "toothNo": 41, "primaryTeeth": "P", "mixedTeeth": "P-41" },
      { "toothNo": 42, "primaryTeeth": "Q", "mixedTeeth": "Q-42" },
      { "toothNo": 43, "primaryTeeth": "R", "mixedTeeth": "R-43" },
      { "toothNo": 44, "primaryTeeth": "S", "mixedTeeth": "S-44" },
      { "toothNo": 45, "primaryTeeth": "T", "mixedTeeth": "T-45" },
      { "toothNo": 46, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 47, "primaryTeeth": "", "mixedTeeth": "" },
      { "toothNo": 48, "primaryTeeth": "", "mixedTeeth": "" }
    );

  }

  checkTeethClasses(ele: any) {
    if (ele) {
      for (let i = 0; i < this.teethCheckedArr.length; i++) {
        if (ele.markSerial == 1 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['crownSerial'] = ele.id + this.teethCheckedArr[i].toothNo
        }
        else if (ele.markSerial == 2 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['bracesesSerial'] = ele.id + this.teethCheckedArr[i].toothNo
        }
        else if (ele.markSerial == 3 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['veneerSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 4 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['maskSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 5 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['implantSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 6 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['fiberSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 7 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['extractionSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 8 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['bridgeSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 9 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['fillContainersSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 10 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['fillInsideSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 11 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['profileSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 12 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['fillProfileSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }

        else if (ele.markSerial == 13 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['cariesGeneralSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 14 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['cariesRecurrentSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 15 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['cariesRootSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 16 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['cosmeticProblemSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 17 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['crackedFillingSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 18 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['crackedToothSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 19 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['diastemaSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 20 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['enamelDefectSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 21 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['microLeakageSerial'] = ele.id + this.teethCheckedArr[i].toothNo;


        }
        else if (ele.markSerial == 22 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['paRadiolucencySerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 23 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['perioDontitsSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 24 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['painSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 25 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['bleedingSerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 26 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['mobilitySerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 27 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['recessionSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 28 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['sensetivitySerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 29 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['brokenToothSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 30 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['badOdorSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 31 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['furcationInvationSerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 32 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['stainingSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 33 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['inflammtionSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 34 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['swellingSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 35 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['calulusSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 36 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['disColorationSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 37 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['rctSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 38 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['amalGamrestSerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 39 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['compositeRestSerial'] = ele.id + this.teethCheckedArr[i].toothNo;

        }
        else if (ele.markSerial == 40 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['classiSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 41 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['telTedSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 42 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['othersSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 43 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['goldenCrownSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 44 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['fractureSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 45 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['rootCanalSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 46 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['missingToothSerial'] = ele.id + this.teethCheckedArr[i].toothNo;
        }
        else if (ele.markSerial == 48 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['classVSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (ele.markSerial == 49 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['bracketsSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (ele.markSerial == 50 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['spaceMaintainerSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (ele.markSerial == 51 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['restorationSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (ele.markSerial == 52 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['abcessSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (ele.markSerial == 53 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['classiiSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
        else if (ele.markSerial == 54 && this.teethCheckedArr[i]['toothNo'] == ele.toothNo) {
          this.teethCheckedArr[i]['impactedToothSerial'] = ele.id + this.teethCheckedArr[i].toothNo;;
        }
      }
    }

  }
  //search area
  searchOnAllMarks: any[] = [];
  creatpsearch() {
    this.searchMarkInput.valueChanges.subscribe(x => {
      debounceTime(100);
      this.searchOnMarksArr(x);
    })

  }

  searchOnMarksArr(value: string) {
    let exp = /^[A-Za-z][A-Za-z0-9_ ]*$/;
    if (value && value.length > 0) {
      this.markArr = [];
      if (exp.test(value) || value == '') {
        this.markArr = this.searchOnAllMarks.filter(s => s.nameEn.includes(value));
      }
      else {
        if (isNaN(+value)) {
          this.markArr = this.searchOnAllMarks.filter(s => s.nameEn.includes(value));
        }
        else {
          this.markArr = this.searchOnAllMarks.filter(s => s['sort'] == +value);
        }
      }
    }
    if (value.length == 0) {
      this.markArr = this.searchOnAllMarks;
    }
  }
  searchOnAllClickedMarks: any[] = [];
  createClickedToothSearch() {
    this.searchToothInput.valueChanges.subscribe(x => {
      debounceTime(100);
      this.searchToothOperations(x);
    })
  }

  searchToothOperations(value: string) {
    let exp = /^[A-Za-z][A-Za-z0-9_ ]*$/;
    if (value && value.length > 0) {
      this.markClickedArr = [];
      if (exp.test(value) || value == '') {

        this.markClickedArr = this.searchOnAllClickedMarks.filter(s => s['nameEn'].includes(value));
      }
      else {
        if (isNaN(+value)) {
          this.markClickedArr = this.searchOnAllClickedMarks.filter(s => s['nameEn'].includes(value));
        } else {
          this.markClickedArr = this.searchOnAllClickedMarks.filter(s => s['toothChartTypeDesc'] == +value);
        }
      }
    }
    if (value.length == 0) {
      this.markClickedArr = this.searchOnAllClickedMarks;
    }
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
