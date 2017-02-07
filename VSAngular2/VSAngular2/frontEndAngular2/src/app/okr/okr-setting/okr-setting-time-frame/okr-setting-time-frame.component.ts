import { Component, OnInit,ViewChild, Input } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';

import { Router }            from '@angular/router';

import 'rxjs';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {IMyOptions, IMyDateRangeModel, IMyDateRange, IMyInputFieldChanged, IMyCalendarViewChanged} from 'mydaterangepicker';




import { OkrSettingNavigationComponent} from '../okr-setting-navigation/okr-setting-navigation.component'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SettingTimeFrameService} from './setting-time-frame.service';
import {Timeframeclass} from './timeframeclass';




//import swal from 'sweetalert2'
declare var swal: any;
@Component({
  selector: 'setting-content',
  providers: [SettingTimeFrameService],
  templateUrl: './okr-setting-time-frame.component.html',
  styleUrls: ['./okr-setting-time-frame.component.css']
})
export class OkrSettingTimeFrameComponent implements OnInit {
  public pageTitle="OKRs Setting";
  public subPageTitle="Time Frame Setting";



  public timeFrames : Timeframeclass[];
  public timeFramesData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  selectedHero: Timeframeclass;

  //datepicker configration
  startDate:any;
  endDate:any;

  public pushData:any;
  public databases;
   public tempData:any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;

  editDateRangeNormal:IMyDateRange=null;
  public checkFlag:number=0;



  constructor(private _settingTimeFrameService: SettingTimeFrameService,
              private router: Router
   ) {

    console.log('constructor(): SampleDateRangePickerNormal');
    this.timeFrames=[];

    }



  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this.getTimeFrames();
  }


  editCurrentTimeFrames(){
    console.log("editCurrentStore");

  }

  getTimeFrames() {
    this._settingTimeFrameService.getAllTimeFrames()
      .subscribe(
        data => this.timeFramesData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{
          //console.log( "this.timeFramesData + "+JSON.stringify(this.timeFramesData));
          this.timeFrames=this.timeFramesData;
        }
      );

  }


  deleteTimeFrame(tf) {
   this.showAlert();

      // this._settingTimeFrameService
      //   .deleteTheTimeFrame(tf.time_freame_id)
      //   .subscribe(
      //     data =>{this.tempData=data},
      //     error => {this.errorMessage = <any>error},
      //     ()=>{
      //       console.log(this.tempData);
      //       this.timeFrames = this.timeFrames.filter(h => h !== tf);
      //       //swal("Deleted!", "Your time frame has been deleted.", "success");
      //     }
      //   );



  }

 deleteFlag(){
    console.log("before"+this.checkFlag);
    this.checkFlag=1;
   console.log("after"+this.checkFlag);
 }

  showAlert() {
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this time frame!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",

        confirmButtonText:'Yes, delete it!',
        cancelButtonText: "No, cancel plx!"

    },
      function (isConfirm) {
        if (isConfirm) {
          swal("Deleted!", "Your time frame has been deleted.", "success");

        } else {
          swal("Cancelled", "Your time frame is safe :)", "error");
        }
      });




  }



  updateTimeFrame(tf) {
    console.log(tf);


  }

  createNewTimeFrame (timeFrameNameInput:string) {
    if (!timeFrameNameInput || !this.startDate ||!this.endDate ) {
      alert("Do not leave any empty!");
      return;
    }
    console.log("timeFrameName: "+ timeFrameNameInput +"this.startDate" + this.startDate + "this.endDate ： " + this.endDate);
    this._settingTimeFrameService.addNewTimeFrame(timeFrameNameInput, this.startDate, this.endDate)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "this.tempData + "+JSON.stringify(this.tempData));
          //this.childtimeFrames=this.tempData;
          this.timeFrames.push(this.tempData);
         // this.showAddRecordSuccessAlert();
        }
      );
    this.modal.close();
  }


 //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!
  showAddRecordSuccessAlert() {
    swal({
      title: "Success!",
      text: "The New Record Has Been Add Into The System!",
      type: "success"
    });

  }









  //ng2 liftcycle functions

  onSelect(timeFrame: Timeframeclass ): void {
    this.selectedHero = timeFrame;
  }

  //component functions
  ngOnInit() {
    console.log('onInit(): SampleDateRangePickerNormal');
    this.getTimeFrames();
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
  }

  onCalendarViewChanged(event: IMyCalendarViewChanged) {
    console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
  }














  //calendar setting and functions


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


}
