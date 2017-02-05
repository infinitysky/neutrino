import { Component, OnInit,Input } from '@angular/core';

import {CalendarModule} from 'primeng/primeng';



@Component({
  selector: 'app-time-frame-setting-modal',
  templateUrl: './time-frame-setting-modal.component.html',
  styleUrls: ['./time-frame-setting-modal.component.css'],

})

export class TimeFrameSettingModalComponent implements OnInit {

  dateValue:Date;
  dateFrom: Date;
  dateTo: Date;
  errorMessage:string;
  datepickerToOpts: any = {};

  handleDateFromChange(dateFrom: Date) {
    // update the model
    this.dateFrom = dateFrom;
    console.log(this.dateFrom);
    // do not mutate the object or angular won't detect the changes
    this.datepickerToOpts = {
      startDate: dateFrom
    };
  }

  getDate(dt: Date): number {
    return dt && dt.getTime();
  }

  ngOnInit() {
  }


  submitData(){
    var checkFlag=this.dateComparison(this.dateFrom,this.dateTo);
    if (checkFlag!=1){
      this.alertMessage("ERROR");
    }

  }

  alertMessage(message:string){

  }
  dateComparison(fromeDate:Date, toDate:Date):number{
    if(fromeDate.getMilliseconds() < toDate.getMilliseconds()){
      return 1;
    }
    else{
      return 0;
    }

  }


}
