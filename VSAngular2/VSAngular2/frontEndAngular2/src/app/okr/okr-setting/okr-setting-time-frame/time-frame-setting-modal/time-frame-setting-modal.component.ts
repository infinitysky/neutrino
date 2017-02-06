import { Component, OnInit,Input,ViewChild } from '@angular/core';


import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {IMyOptions, IMyDateRangeModel, IMyDateRange, IMyInputFieldChanged, IMyCalendarViewChanged} from 'mydaterangepicker';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import {SettingTimeFrameService} from '../setting-time-frame.service';
import {Timeframeclass} from '../timeframeclass';
@Component({
  selector: 'app-time-frame-setting-modal',
  providers: [SettingTimeFrameService],
  templateUrl: './time-frame-setting-modal.component.html',
  styleUrls: ['./time-frame-setting-modal.component.css'],

})

export class TimeFrameSettingModalComponent implements OnInit {


  //datepicker configration
  startDate:any;
  endDate:any;

  public pushData:any;
  public databases;
  public timeFrames:Timeframeclass[];

  private myDateRangePickerOptionsNormal: IMyOptions = {
    clearBtnTxt: 'Clear',
    beginDateBtnTxt: 'Begin Date',
    endDateBtnTxt: 'End Date',
    acceptBtnTxt: 'Apply',
    dateFormat: 'dd/mm/yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '50%',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true,
    minYear: 2000,
    maxYear: 2099,
    componentDisabled: false,
    showClearDateRangeBtn: true,
    showSelectorArrow: true
  };

  //selectedDateRangeNormal:string = '04 Nov 2016 - 26 Nov 2016';
  selectedDateRangeNormal:IMyDateRange = {beginDate: {year: 2017, month: 1, day: 1}, endDate: {year: 2017, month: 1, day: 1}};

  selectedTextNormal: string = '';
  border: string = 'none';

  placeholderTxt: string = '';

  constructor( private _settingTimeFrameService:SettingTimeFrameService
  ) {
    console.log('constructor(): SampleDateRangePickerNormal');
  }

  clearDateRange() {
    this.selectedDateRangeNormal = null;
  }

  onDisableComponent(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.componentDisabled = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onEditableDateField(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.editableDateRangeField = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onAlignSelectorRight(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.alignSelectorRight = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onShowClearButton(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.showClearDateRangeBtn = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onShowPlaceholderText(checked: boolean) {
    this.placeholderTxt = checked ? 'Select a date range' : '';
  }

  ngOnInit() {
    console.log('onInit(): SampleDateRangePickerNormal');
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' - beginJsDate: ', new Date(event.beginJsDate).toLocaleDateString(), ' - End: ', event.endDate, ' - endJsDate: ', new Date(event.endJsDate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
    if(event.formatted !== '') {
      this.selectedTextNormal = 'Formatted: ' + event.formatted;
      this.border = '1px solid #CCC';

      this.selectedDateRangeNormal = {beginDate: event.beginDate, endDate: event.endDate};
      this.startDate=event.beginEpoc;
      this.endDate=event.endEpoc;
      console.log("this.startDate "+ this.startDate + " this.endDate " +this.endDate );
    }
    else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
  }

  onCalendarViewChanged(event: IMyCalendarViewChanged) {
    console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
  }

  getCopyOfOptions(): IMyOptions {
    return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsNormal));
  }


  //Modal configration
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.modal.close();
  }

  dismissed() {

  }

  opened() {

  }

  navigate() {

  }

  open() {
    this.modal.open();
  }





  // major functions
  submitInfo(){


  }


  cleanData(){

  }


  alertMessage(message:string){
    alert(message);

  }
  closeModal(){

  }


  createNewTimeFrame(timeFrameName:string){
     {
      if (!timeFrameName || !this.startDate ||!this.endDate ) {
        alert("Do not leave any empty!");
        return;
      }
      this._settingTimeFrameService.addNewTimeFrame(timeFrameName, this.startDate, this.endDate)
        .subscribe(
          //database  => this.databases.push(database),
          data  => {this.pushData = data, this.timeFrames.push(data)},
          //pushData  => this.databases.push(this.pushData.data),
          err => console.error(err),
          () => {
           // this.displayMessage=this.pushData.message

          });
      //.do(pushData=>console.log());

      //alert( this.pushData.message);
      //console.log(this.pushData);
    }
  }


}
