import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';




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
  @Input() childtimeFrames:Timeframeclass[]=[];
  public errorMessage:any;
  public tempData:any;



  subscription: Subscription;



  //component functions
  ngOnInit() {
    console.log('onInit(): SampleDateRangePickerNormal');
  }

  constructor( private _settingTimeFrameService:SettingTimeFrameService
  ) {
    console.log('constructor(): SampleDateRangePickerNormal');
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
  }

  onCalendarViewChanged(event: IMyCalendarViewChanged) {
    console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
  }






  //calander setting and functions


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



  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    if (this.childtimeFrames != undefined) {
      // this.childtimeFrames.unsubscribe();
    }
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

/*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  */

  createNewTimeFrame (timeFrameName:string) {

    if (!timeFrameName || !this.startDate ||!this.endDate ) {
      alert("Do not leave any empty!");
      return;
    }

    this._settingTimeFrameService.addNewTimeFrame(timeFrameName, this.startDate, this.endDate)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "this.tempData + "+JSON.stringify(this.tempData));
          //this.childtimeFrames=this.tempData;
          this.childtimeFrames.push(this.tempData);


        }
      );

    // this._settingTimeFrameService.createTimeFrame(timeFrameName, this.startDate, this.endDate)
    //   .then(timeFramedata => {
    //     this.timeFrames.push(timeFramedata);
    //
    //   });

    this.modal.close();

  }





}
